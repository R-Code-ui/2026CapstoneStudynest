<?php

namespace App\Http\Responses;

use Illuminate\Http\RedirectResponse;
use Laravel\Fortify\Contracts\LoginResponse as LoginResponseContract;

class LoginResponse implements LoginResponseContract
{
    /**
     * Create an HTTP response that represents the object.
     */
    public function toResponse($request): RedirectResponse
    {
        $user = $request->user();

        return match (true) {
            $user->hasRole('principal') => redirect()->intended('/principal/dashboard'),
            $user->hasRole('teacher') => redirect()->intended('/teacher/dashboard'),
            $user->hasRole('student') => redirect()->intended('/student/dashboard'),
            default => redirect()->intended('/dashboard'),
        };
    }
}
