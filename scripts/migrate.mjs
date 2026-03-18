// Apply v3 schema to Supabase via the SQL API
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const sql = readFileSync(join(__dirname, "..", "infra", "schema-v3.sql"), "utf8");

// Split into individual statements and run them one by one
// This avoids issues with multi-statement execution
const statements = sql
  .split(";")
  .map((s) => s.trim())
  .filter((s) => s.length > 0 && !s.startsWith("--"));

console.log(`Found ${statements.length} SQL statements to execute`);

let success = 0;
let failed = 0;

for (const stmt of statements) {
  const fullStmt = stmt + ";";
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: SERVICE_ROLE_KEY,
        Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
        Prefer: "return=minimal",
      },
      body: JSON.stringify({ query: fullStmt }),
    });

    if (!res.ok) {
      // Try alternative: use the pg_net or direct SQL endpoint
      throw new Error(`REST RPC failed: ${res.status}`);
    }
    success++;
  } catch {
    // Fallback: try the Supabase SQL query endpoint (used by dashboard)
    try {
      const res = await fetch(`${SUPABASE_URL}/pg/query`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
        },
        body: JSON.stringify({ query: fullStmt }),
      });
      if (res.ok) {
        success++;
      } else {
        const text = await res.text();
        console.error(`Failed: ${fullStmt.substring(0, 60)}...`);
        console.error(`  Response: ${text.substring(0, 200)}`);
        failed++;
      }
    } catch (e) {
      console.error(`Failed: ${fullStmt.substring(0, 60)}...`);
      console.error(`  Error: ${e.message}`);
      failed++;
    }
  }
}

console.log(`\nResults: ${success} succeeded, ${failed} failed`);
if (failed > 0) {
  console.log("\nNote: If all statements failed, you may need to run the SQL manually.");
  console.log("Copy infra/schema-v3.sql and paste it into the Supabase SQL Editor:");
  console.log(`  ${SUPABASE_URL.replace('.supabase.co', '')}/project/lajnuzhwbcsolztlyzsr/sql`);
  console.log("\nOr use: npx supabase db push (after linking your project)");
}
