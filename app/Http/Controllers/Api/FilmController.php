<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\StoreRequest;
use App\Http\Controllers\Controller;
use App\Models\Film;
use Illuminate\Http\Request;

class FilmController extends Controller
{
    public function index()
    {
        $films = Film::all();
        return response()->json($films);
    }

    // public function store(Request $request)
    // {
    //     $data = $request->validate([
    //         // 'Service_Id' => 'required|int',
    //         // 'film_category_id' => 'required|int',
    //         // 'Film_name' => 'required|string',
    //         // 'Film_thumbnail' => 'required|string',
    //         // 'Film_desc' => 'required|string',
    //         'Video' => 'required|file|mimes:mp4|max:20480', // Add video validation rules
    //     ]);

    //     // Check if a video has been uploaded
    //     if ($request->hasFile('Video')) {
    //         // Get the uploaded video from the request
    //         $uploadedVideo = $request->file('Video');

    //         // Store the uploaded video in a public storage disk
    //         $videoPath = $uploadedVideo->store('public/videos');

    //         // Update the Video field in the data array with the video path
    //         $data['Video'] = $videoPath;
    //     }

    //     $film = new Film;
    //     $film->fill($data);
    //     $film->Video = $videoPath;
    //     $film->save();

    //     return response()->json($film, 201);
    // }
    public function store(StoreRequest $request)
    {
        $data = $request->validated();

        $data['stream_service_provider_id'] = $request->input('stream_service_provider_id');
        $data['film_name'] = $request->input('film_name');
        $data['film_thumbnail'] = $request->input('film_thumbnail');
        $data['film_desc'] = $request->input('film_desc');

        if ($request->hasFile('video')) {
            $uploadedVideo = $request->file('video');
            $videoName = $uploadedVideo->getClientOriginalName();
            $videoPath = $uploadedVideo->storeAs('public/videos', $videoName);
            $data['video'] = $videoName;
        }

        $film = new Film;
        $film->fill($data);
        $film->save();

        return response()->json($film, 201);
    }
    // public function store(Request $request)
    //     {
    //         $data = $request->validate([
    //             'stream_service_provider_id' => 'required',
    //             'film_name' => 'required|string',
    //             'film_thumbnail' => 'required|string',
    //             'film_desc' => 'required|string',
    //             'video' => 'required|mimetypes:video/*|max:20480',
    //             'cate_name' => 'required|string',
    //         ]);

    //         $videoPath = "123";

    //         if ($request->hasFile('video')) {
    //             $uploadedVideo = $request->file('video');
    //             $videoPath = $uploadedVideo->store('public/videos');

    //             return response()->json(['video' => $videoPath]);
    //         } else {
    //             return response()->json(['message' => 'No video file uploaded'], 400);
    //         }


    //         $film->stream_service_provider_id = $data['stream_service_provider_id'];
    //         $film->film_name = $data['film_name'];
    //         $film->film_thumbnail = $data['film_thumbnail'];
    //         $film->film_desc = $data['film_desc'];
    //         $film->video = $videoPath;
    //         $film = new Film();
    //         $film->save();

    //         // $film->categories()->sync($data['cate_name']);

    //         return response()->json(['message' => $film]);
    //     }


    public function update(StoreRequest $request, $id)
    {
        $film = Film::findOrFail($id);

        $data = $request->validated();

        // Check if a video has been uploaded
        if ($request->hasFile('video')) {
            $uploadedVideo = $request->file('video');
            $videoName = $uploadedVideo->getClientOriginalName(); // Lấy tên tệp tin gốc
            $videoPath = $uploadedVideo->storeAs('public/videos', $videoName); // Lưu tệp tin với tên gốc vào thư mục
            $data['video'] = $videoName; // Lưu tên tệp tin vào cơ sở dữ liệu thay vì đường dẫn
        }

        $film->fill($data);
        $film->save();

        return response()->json($film, 200);
    }


    public function destroy($id)
    {
        $film = Film::findOrFail($id);
        $film->delete();
        return response()->json(null, 204);
    }
}
