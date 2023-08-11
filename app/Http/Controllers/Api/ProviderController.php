<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\StreamServiceProvider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Models\Subscription;
use App\Models\User;

class ProviderController extends Controller
{
    /**
     * Display the specified resource.
     */
    public function show(string $providerId)
    {
        $user = Auth::user();
        $userId = Auth::user()->id;
        $userBalance = $user->balance;
        // Lấy thông tin về provider dựa trên providerId
        $provider = StreamServiceProvider::where('id', $providerId)->first();

        if ($provider) {
            // Lấy thông tin về các bộ phim thuộc về provider
            $films = DB::table('films')
                ->where('stream_service_provider_id', $provider->id)
                ->get();

            // Xử lý thông tin về subcription payment
            // ...

            // Gom tất cả thông tin lại để trả về dưới dạng JSON
            $result = [
                'provider' => $provider,
                'films' => $films,
                'user_balance' => $userBalance,
                // Thêm thông tin về subcription payment nếu cần
            ];

            return response()->json($result, 200);
        } else {
            return response()->json(['message' => 'Provider not found'], 404);
        }
    }

    public function getProviders()
    {
        $user = Auth::user();

        $providers = $user->providers;

        return response()->json(['providers' => $providers]);
    }

    public function subscribeToService(Request $request)
    {
        $user = Auth::user();

        if ($user->balance >= 50) {
            $user->balance -= 50;
            $user->save();

            $subscriptionData = [
                'user_id' => $user->id,
                'provider_id' => $request->provider_id, // Thay bằng cách lấy provider_id từ request
                'billing_amount' => 50,
                'expire_date' => now()->addMonth(),
            ];

            $subscription = new Subscription($subscriptionData);
            $subscription->save();

            return response()->json(['message' => 'Subscription successful']);
        } else {
            return response()->json(['message' => 'Insufficient balance'], 400);
        }
    }

    public function updatepay()
    {
        $user = Auth::user();

        // Check if the user has an active subscription
        $subscription = $user->subcribings()->latest()->first();

        if (!$subscription) {
            return response()->json(['message' => 'No active subscription'], 400);
        }

        $subscriptionCost = 50; // Cost of subscription extension

        // Check if the user has sufficient balance
        if ($user->balance >= $subscriptionCost) {
            // Begin a database transaction
            DB::beginTransaction();

            try {
                // Deduct the subscription cost from the user's balance
                $user->balance -= $subscriptionCost;
                $user->save();

                // Extend the expiration date of the subscription using a raw SQL update
                $newExpireDate = DB::raw('DATE_ADD(expire_date, INTERVAL 1 MONTH)');
                DB::table('subscriptions')
                    ->where('user_id', $user->id)
                    ->where('provider_id', $subscription->id)
                    ->update(['expire_date' => $newExpireDate]);

                // Commit the transaction
                DB::commit();

                return response()->json(['message' => 'Subscription extended successfully']);
            } catch (\Exception $e) {
                // If an exception occurs, rollback the transaction
                DB::rollback();

                return response()->json(['message' => 'An error occurred'], 500);
            }
        } else {
            return response()->json(['message' => 'Insufficient balance'], 400);
        }
    }
}
