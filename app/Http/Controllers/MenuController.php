<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Menu;
use Illuminate\Support\Str;
use Illuminate\Database\QueryException;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Redirect;

class MenuController extends Controller
{
    /**
     * get menu.
     */
    public function get(string $id){
        $menu = Menu::with('children')->where('id', $id)->first();
        return response()->json($menu);
    }

    /**
     * Update the menu.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request)
    {
        try {
            $validated = $request->validate([
                'id'        => 'nullable|integer',
                'parent_id' => 'required|integer',
                'name'      => 'required|string|max:100',
            ]);

            // Check if the menu exists if 'id' is provided
            /** @var Menu | null */
            $menu = $validated['id'] ? Menu::find($validated['id']) : null;

            if ($validated['id'] && !$menu) {
                return Redirect::back()->with(['message' => 'Menu not found']);
            }

            if (!$validated['id']) {
                // Create a new menu if 'id' is not provided
                $menu = Menu::create([
                    'menu_id'   => (string) Str::uuid(),
                    'parent_id' => $validated['parent_id'],
                    'name'      => $validated['name'],
                ]);
                return Redirect::back()->with(['message' => 'Menu created successfully']);
            }

            // Update the existing menu
            $menu->update([
                'parent_id' => $validated['parent_id'],
                'name'      => $validated['name'],
            ]);

            return Redirect::back()->with(['message' => 'Menu updated successfully']);
        } catch (ValidationException $e) {
            $message = app()->environment('local', 'development') ? $e->errors() : 'Invalid data provided';
            return Redirect::back()->with(['message' => $message]);
        } catch (QueryException $e) {
            $message = app()->environment('local', 'development') ? $e->getMessage() : 'Database error occurred';
            return Redirect::back()->with(['message' => $message]);
        } catch (\Exception $e) {
            $message = app()->environment('local', 'development') ? $e->getMessage() : 'An unexpected error occurred';
            return Redirect::back()->with(['message' => $message]);
        }
    }

    public function destroy(Request $request)
    {
        try {
            $validated = $request->validate([
                'id' => 'required|integer',
            ]);

            /** @var Menu */
            $menu = Menu::find($validated['id']);

            if (!$menu) {
                return Redirect::back()->with(['message' => 'Menu not found']);
            }

            $menu->delete();

            return Redirect::back()->with(['message' => 'Menu deleted successfully']);
        } catch (ValidationException $e) {
            $message = app()->environment('local', 'development') ? $e->errors() : 'Invalid data provided';
            return Redirect::back()->with(['message' => $message]);
        } catch (QueryException $e) {
            $message = app()->environment('local', 'development') ? $e->getMessage() : 'Database error occurred';
            return Redirect::back()->with(['message' => $message]);
        } catch (\Exception $e) {
            $message = app()->environment('local', 'development') ? $e->getMessage() : 'An unexpected error occurred';
            return Redirect::back()->with(['message' => $message]);
        }
    }
}
