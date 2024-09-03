<?php

namespace Database\Seeders;

use Illuminate\Support\Str;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MenuSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('menus')->insert([
            [
                'id' => 1,
                'menu_id'   => (string) Str::uuid(),
                'parent_id' => 0,
                'name'      => 'system management',
            ]
        ]);
    }
}
