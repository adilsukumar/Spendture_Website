import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Save, ExternalLink } from "lucide-react";

const AdminSettings = () => {
  const { toast } = useToast();
  const [webhookUrl, setWebhookUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data, error } = await supabase
          .from("app_settings")
          .select("value")
          .eq("key", "zapier_webhook_url")
          .maybeSingle();

        if (error) throw error;
        if (data?.value) {
          setWebhookUrl(data.value);
        }
      } catch (error) {
        console.error("Error fetching settings:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from("app_settings")
        .upsert(
          { key: "zapier_webhook_url", value: webhookUrl.trim() },
          { onConflict: "key" }
        );

      if (error) throw error;

      toast({
        title: "Settings saved",
        description: "Your Zapier webhook URL has been updated.",
      });
    } catch (error) {
      console.error("Error saving settings:", error);
      toast({
        title: "Error",
        description: "Failed to save settings. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-1">Configure integrations and app settings</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Google Sheets Integration
          </CardTitle>
          <CardDescription>
            Connect your waitlist signups to Google Sheets via Zapier. New signups will be automatically added to your spreadsheet.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="webhook-url">Zapier Webhook URL</Label>
            <Input
              id="webhook-url"
              type="url"
              placeholder="https://hooks.zapier.com/hooks/catch/..."
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
              className="font-mono text-sm"
            />
            <p className="text-xs text-muted-foreground">
              Create a Zap with "Webhooks by Zapier" trigger → "Google Sheets" action to add rows.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Button onClick={handleSave} disabled={isSaving}>
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Settings
                </>
              )}
            </Button>
            
            <a
              href="https://zapier.com/app/zaps/create"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-soft-aqua hover:underline flex items-center gap-1"
            >
              Create a Zap
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="mt-6 p-4 bg-muted/50 rounded-lg">
            <h4 className="font-medium text-sm mb-2">Setup Instructions:</h4>
            <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
              <li>Go to Zapier and create a new Zap</li>
              <li>Choose "Webhooks by Zapier" as the trigger</li>
              <li>Select "Catch Hook" as the event</li>
              <li>Copy the webhook URL and paste it above</li>
              <li>Add "Google Sheets" as the action</li>
              <li>Select "Create Spreadsheet Row" as the event</li>
              <li>Map the fields: email, role, city, referral_code, position, signed_up_at</li>
              <li>Turn on your Zap!</li>
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSettings;
