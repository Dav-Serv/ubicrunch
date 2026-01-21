<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Menu;
use App\Models\Order;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        $totalProducts = Menu::count();
        $totalOrders = Order::where('status', '!=', 'cancelled')->count();
        $totalSales = Order::where('status', 'completed')->sum('total_price');

        $recentOrders = Order::latest()->take(5)->get();

        return response()->json([
            'stats' => [
                'total_products' => $totalProducts,
                'total_orders' => $totalOrders,
                'total_sales' => (float) $totalSales,
            ],
            'recent_orders' => $recentOrders
        ]);
    }
}
