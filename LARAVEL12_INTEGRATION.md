# Laravel 12 integration (PostgreSQL JSONB)

## 1) Configure frontend endpoint

In each HTML page that can save documents (at least `documentos.html`), add before `app.js`:

```html
<script>
  window.DOCUMENTO_API_URL = 'http://localhost:8000/api/documentos';
</script>
```

Current frontend behavior:
- saves in localStorage
- logs full JSON to console
- if `window.DOCUMENTO_API_URL` exists, posts payload via `fetch`

## 2) Laravel 12 API route

`routes/api.php`

```php
use App\Http\Controllers\DocumentoPayloadController;
use Illuminate\Support\Facades\Route;

Route::post('/documentos', [DocumentoPayloadController::class, 'store']);
```

## 3) Migration (PostgreSQL JSONB)

```bash
php artisan make:migration create_documento_payloads_table
```

`database/migrations/xxxx_xx_xx_xxxxxx_create_documento_payloads_table.php`

```php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('documento_payloads', function (Blueprint $table) {
            $table->id();
            $table->string('documento_id')->index();
            $table->string('tipo_id')->index();
            $table->jsonb('payload');
            $table->timestampsTz();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('documento_payloads');
    }
};
```

Run:

```bash
php artisan migrate
```

## 4) Model

```bash
php artisan make:model DocumentoPayload
```

`app/Models/DocumentoPayload.php`

```php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DocumentoPayload extends Model
{
    protected $fillable = [
        'documento_id',
        'tipo_id',
        'payload',
    ];

    protected $casts = [
        'payload' => 'array',
    ];
}
```

## 5) Controller

```bash
php artisan make:controller DocumentoPayloadController
```

`app/Http/Controllers/DocumentoPayloadController.php`

```php
namespace App\Http\Controllers;

use App\Models\DocumentoPayload;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DocumentoPayloadController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'documento' => ['required', 'array'],
            'documento.id' => ['required', 'string'],
            'documento.tipoId' => ['required', 'string'],
        ]);

        $record = DocumentoPayload::create([
            'documento_id' => $data['documento']['id'],
            'tipo_id' => $data['documento']['tipoId'],
            'payload' => $request->all(),
        ]);

        return response()->json([
            'ok' => true,
            'id' => $record->id,
        ], 201);
    }
}
```

## 6) CORS (if frontend is another origin)

`config/cors.php` (adjust):

- `paths` include `api/*`
- allow origin where your static app runs (example: `http://127.0.0.1:5500`)

## 7) PostgreSQL .env

```env
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=your_db
DB_USERNAME=your_user
DB_PASSWORD=your_password
```

Then:

```bash
php artisan config:clear
```

