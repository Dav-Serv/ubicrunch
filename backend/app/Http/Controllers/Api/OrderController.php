<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Menu;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class OrderController extends Controller
{
    /**
     * CUSTOMER - BUAT ORDER (PUBLIC, TANPA AUTH)
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'customer_name'    => 'required|string|max:100',
            'customer_phone'   => 'required|string|max:20',
            'customer_address' => 'required|string|max:255',

            // 🔥 PAYMENT (HANYA METHOD)
            'payment_method'   => 'required|in:dana, gopay, ovo, shopeepay',

            // ITEMS
            'items'            => 'required|array|min:1',
            'items.*.menu_id'  => 'required|exists:menus,id',
            'items.*.qty'      => 'required|integer|min:1|max:99',
        ]);

        DB::beginTransaction();

        try {
            // 🧾 BUAT ORDER
            $order = Order::create([
                'order_code'      => 'ORD-' . strtoupper(Str::random(8)),
                'customer_name'   => $data['customer_name'],
                'customer_phone'  => $data['customer_phone'],
                'customer_address'=> $data['customer_address'],
                'payment_method'  => $data['payment_method'],
                'total_price'     => 0,
                'status'          => 'pending',
            ]);

            $total = 0;

            // 📱 PESAN WHATSAPP
            $message  = "Halo Admin 👋\n";
            $message .= "Saya mau pesan:\n\n";
            $message .= "Nama: {$order->customer_name}\n";
            $message .= "No HP: {$order->customer_phone}\n";
            $message .= "Alamat: {$order->customer_address}\n\n";
            $message .= "Metode Pembayaran:\n";
            $message .= "- " . strtoupper($order->payment_method) . "\n\n";
            $message .= "Pesanan:\n";

            foreach ($data['items'] as $item) {
                $menu = Menu::lockForUpdate()->findOrFail($item['menu_id']);

                if ($menu->stock < $item['qty']) {
                    throw new \Exception("Stok {$menu->name} tidak mencukupi");
                }

                // kurangi stok
                $menu->decrement('stock', $item['qty']);


                $subtotal = $menu->price * $item['qty'];
                $total += $subtotal;

                OrderItem::create([
                    'order_id' => $order->id,
                    'menu_id'  => $menu->id,
                    'qty'      => $item['qty'],
                    'price'    => $menu->price,
                ]);

                $message .= "- {$menu->name} x{$item['qty']} = Rp "
                    . number_format($subtotal) . "\n";
            }

            $message .= "\nTotal: Rp " . number_format($total) . "\n\n";
            $message .= "Terima kasih 🙏";

            $order->update(['total_price' => $total]);

            DB::commit();

            // 📱 NOMOR WA ADMIN (GANTI SESUAI PUNYAMU)
            $adminPhone = '6281234567890';

            $waUrl = "https://wa.me/{$adminPhone}?text=" . urlencode($message);

            return response()->json([
                'message'       => 'Order siap dikirim ke WhatsApp',
                'order_code'    => $order->order_code,
                'whatsapp_url'  => $waUrl
            ], 201);

        } catch (\Throwable $e) {
            DB::rollBack();

            return response()->json([
                'message' => 'Gagal membuat order',
                'error'   => $e->getMessage()
            ], 500);
        }
    }

    /**
     * CUSTOMER - CEK DETAIL ORDER
     */
    public function show($code)
    {
        $order = Order::with('items.menu')
            ->where('order_code', $code)
            ->firstOrFail();

        return response()->json($order);
    }

    /**
     * ADMIN - LIST ORDER
     */
    public function index()
    {
        return response()->json(
            Order::with('items.menu')->latest()->get()
        );
    }

    /**
     * ADMIN - UPDATE STATUS ORDER
     */
    public function updateStatus(Request $request, Order $order)
    {
        $request->validate([
            'status' => 'required|in:pending,confirmed,preparing,on_delivery,completed,cancelled',
        ]);

        $order->update([
            'status' => $request->status,
        ]);

        return response()->json([
            'message' => 'Status order diperbarui',
        ]);
    }
}
