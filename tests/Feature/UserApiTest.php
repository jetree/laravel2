<?php

namespace Tests\Feature;

use App\User;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class UserApiTest extends TestCase
{
    use RefreshDatabase;

    public function setUp():void
    {
        parent::setUp();

        $this->user = factory(user::class)->create();
    }

    public function test_ログイン中のユーザーを返却する()
    {
        $response = $this->actingAs($this->user)->json('GET',route('user'));

        $response->assertStatus(200)->assertJson(['name' => $this->user->name,]);
        
    }
    
    public function test_ログインされていない場合は空文字を返却する()
    {
        $response = $this->json('GET',route('user'));
        
        $response->assertStatus(200);

        $this->assertEquals("",$response->content());

    }
}
