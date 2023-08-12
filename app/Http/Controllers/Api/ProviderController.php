<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\StreamServiceProvider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Models\Subscription;
use App\Models\User;
use Carbon\Carbon;

class ProviderController extends Controller
{
    /**
     * Display the specified resource.
     */
    // public function show(string $providerId)
    // {
    //     $user = Auth::user();

    //     // Lấy thông tin về provider dựa trên providerId
    //     $provider = StreamServiceProvider::where('id', $providerId)->first();

    //     if ($provider) {
    //         // Lấy thông tin về các bộ phim thuộc về provider
    //         $films = DB::table('films')
    //             ->where('stream_service_provider_id', $provider->id)
    //             ->get();

    //         // Lấy thông tin về số lượng người dùng đã đăng ký dịch vụ
    //         $subscribedUserCount = $provider->subcribings->count();

    //         // Lấy thông tin về ngày hết hạn đăng ký của người dùng
    //         $subscriptionExpiryDates = $provider->subcribings->pluck('pivot.expire_date');

    //         // Gom tất cả thông tin lại để trả về dưới dạng JSON
    //         $result = [
    //             'provider' => $provider,
    //             'subscribed_user_count' => $subscribedUserCount,
    //             'subscription_expiry_dates' => $subscriptionExpiryDates,
    //             'films' => $films,
    //             // Thêm thông tin về subcription payment nếu cần
    //         ];

    //         return response()->json($result, 200);
    //     } else {
    //         return response()->json(['message' => 'Provider not found'], 404);
    //     }
    // }

    public function show(string $providerId)
    {
        $user = Auth::user();

        // Get the provider and its films
        $provider = StreamServiceProvider::with('films')->find($providerId);

        if (!$provider) {
            return response()->json(['message' => 'Provider not found'], 404);
        }

        // Get information about the current user's subscription
        $subscription = Subscription::where('user_id', $user->id)
            ->where('provider_id', $provider->id)
            ->first();

        $subscribed = $subscription !== null;
        $expireDate = $subscribed ? $subscription->expire_date : null;

        $subscribedUserCount = Subscription::where('provider_id', $provider->id)->count();

        // Build the response data
        $result = [
            'provider' => $provider,
            'subscribed' => $subscribed,
            'subscription_expiry_date' => $expireDate,
            'subscribed_user_count' => $subscribedUserCount,
            'films' => $provider->films,
        ];

        return response()->json($result, 200);
    }

    public function getProviders(Request $request)
    {
        // $user_id = $request->get('user_id');
        $user_id = Auth::user()->id;

        $providers = Subscription::where('user_id', $user_id)
            ->join('stream_service_providers', 'subscriptions.provider_id', '=', 'stream_service_providers.id')
            ->select('stream_service_providers.*')
            ->get();

        return response()->json(['providers' => $providers]);
    }


    // public function subscribeToService(Request $request)
    // {
    //     $user = Auth::user();

    //     if ($user->balance >= 50) {
    //         $user->balance -= 50;
    //         $user->save();

    //         $subscriptionData = [
    //             'user_id' => $user->id,
    //             'provider_id' => $request->provider_id, // Thay bằng cách lấy provider_id từ request
    //             'billing_amount' => 50,
    //             'expire_date' => now()->addMonth(),
    //         ];

    //         $subscription = new Subscription($subscriptionData);
    //         $subscription->save();

    //         return response()->json(['message' => 'Subscription successful']);
    //     } else {
    //         return response()->json(['message' => 'Insufficient balance'], 400);
    //     }
    // }

    // public function updatepay()
    // {
    //     $user = Auth::user();

    //     // Check if the user has an active subscription
    //     $subscription = $user->subcribings()->latest()->first();

    //     if (!$subscription) {
    //         return response()->json(['message' => 'No active subscription'], 400);
    //     }

    //     $subscriptionCost = 50; // Cost of subscription extension

    //     // Check if the user has sufficient balance
    //     if ($user->balance >= $subscriptionCost) {
    //         // Begin a database transaction
    //         DB::beginTransaction();

    //         try {
    //             // Deduct the subscription cost from the user's balance
    //             $user->balance -= $subscriptionCost;
    //             $user->save();

    //             // Extend the expiration date of the subscription using a raw SQL update
    //             $newExpireDate = DB::raw('DATE_ADD(expire_date, INTERVAL 1 MONTH)');
    //             DB::table('subscriptions')
    //                 ->where('user_id', $user->id)
    //                 ->where('provider_id', $subscription->id)
    //                 ->update(['expire_date' => $newExpireDate]);

    //             // Commit the transaction
    //             DB::commit();

    //             return response()->json(['message' => 'Subscription extended successfully']);
    //         } catch (\Exception $e) {
    //             // If an exception occurs, rollback the transaction
    //             DB::rollback();

    //             return response()->json(['message' => 'An error occurred'], 500);
    //         }
    //     } else {
    //         return response()->json(['message' => 'Insufficient balance'], 400);
    //     }
    // }


    // Subscribe or Unsubscribe Function
    public function subscribeOrUnsubscribe(Request $request)
    {
        $userId = Auth::user()->id;
        $providerId = $request->input('provider_id');
        $subscribe = $request->input('subscribe', true); // Default to true if not provided

        $subscriptionExists = Subscription::where('user_id', $userId)
            ->where('provider_id', $providerId)
            ->exists();

        if (!$subscriptionExists) {
            Subscription::create([
                'user_id' => $userId,
                'provider_id' => $providerId,
                'expire_date' => now()->addMonth(),
                'billing_amount' => 5, // Set the appropriate billing amount
            ]);
            return response()->json(['message' => 'Subscription status updated.']);
        } else {
            Subscription::where('user_id', $userId)
                ->where('provider_id', $providerId)
                ->delete();
            return response()->json(['message' => 'Subscription status deleted.']);
        }
    }


    public function extendExpireDate(Request $request)
    {
        $user = Auth::user();
        $userId = $user->id;
        $providerId = $request->input('provider_id');

        $subscription = Subscription::where('user_id', $userId)
            ->where('provider_id', $providerId)
            ->first();

        if (!$subscription) {
            return response()->json(['message' => 'Subscription not found.'], 404);
        }

        $billingAmount = $subscription->billing_amount;

        if ($user->balance >= $billingAmount) {

            // Update user's balance and subscription
            $user->balance -= $billingAmount;

            $subscription->update(['expire_date' => Carbon::parse($subscription->expire_date)->addMonth()]);

            $user->save();

            return response()->json(['message' => 'Subscription extended.']);
        } else {
            return response()->json(['message' => 'Insufficient balance.'], 400);
        }
    }
}
