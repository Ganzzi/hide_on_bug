<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Film;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class FilmController extends Controller
{
    public function getRecommendFilms()
    {
        // get a list of recommended films
        //$user = Auth::user();
    }

    // function for user to watch a film - get provider infor, subcribe, rating, favorite,...
    public function watchFilm($filmId)
    {
    }

    // function to search film with a keyword
    public function searchFilm(Request $request)
    {
    }
}
