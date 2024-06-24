import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://jpvxhwzbjmhjpgaamxqr.supabase.co"
const supabaseKey =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impwdnhod3piam1oanBnYWFteHFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTkwNzI2MTMsImV4cCI6MjAzNDY0ODYxM30.mTeCzeW-_qeqfEM1aaBC8Fk09bCiUyeJgDi-cxG1jYI"
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
