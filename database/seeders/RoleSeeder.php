<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin = Role::firstOrCreate([
            'name' => 'admin'
        ]);

        $user = Role::firstOrCreate([
            'name' => 'user'
        ]);

        $permissions = [
            'manage project',
            'manage category',
            'manage media',
            'manage user',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        $admin->givePermissionTo($permission);

        $adminUser = User::firstOrCreate(
            ['email' => 'admin@gmail.com'],
            [
                'name' => 'Admin',
                'occupation' => 'Admin System',
                'avatar' => 'images/default-avatar.png',
                'password' => bcrypt('password'),
            ]
        );

        $adminUser->assignRole('admin');
    }
}
