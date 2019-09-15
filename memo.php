<?php

Route::post('./login','Auth\LoginController@login')->name('login');

  public function login(Request $request)
    {
        $this->validateLogin($request);
            protected function validateLogin(Request $request)
            {
                $request->validate([
                    $this->username() => 'required|string',
                    'password' => 'required|string',
                ]);
            }
                public function username()
                {
                    return 'email';
                }

        // If the class is using the ThrottlesLogins trait, we can automatically throttle
        // the login attempts for this application. We'll key this by the username and
        // the IP address of the client making these requests into this application.
        
        if (method_exists($this, 'hasTooManyLoginAttempts') &&  $this->hasTooManyLoginAttempts($request)) {
            // method_exists()指定したクラスにメソッドが存在するかどうか

            $this->fireLockoutEvent($request);

            return $this->sendLockoutResponse($request);
        }

        if ($this->attemptLogin($request)) {
            protected function attemptLogin(Request $request)
            {
                
                return $this->guard()->attempt(
                    $this->credentials($request), $request->filled('remember')
                );
            }
            return $this->sendLoginResponse($request);
        }

        // If the login attempt was unsuccessful we will increment the number of attempts
        // to login and redirect the user back to the login form. Of course, when this
        // user surpasses their maximum number of attempts they will get locked out.
        $this->incrementLoginAttempts($request);

        return $this->sendFailedLoginResponse($request);
    }