<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules()
    {
        return [
            'stream_service_provider_id' => 'required',
            'film_name' => 'required|string',
            'film_poster' => 'required|image',
            'video' => 'required|mimetypes:video/*|max:20480',
            'premiere_date' => 'required|date',
            'categories' => 'nullable'
        ];
    }
}
