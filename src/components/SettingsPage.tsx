import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import { User, Bell, Lock, Plug, CheckCircle2 } from "lucide-react";

export function SettingsPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-gray-900">Settings</h1>
        <p className="text-gray-600">Manage your account and preferences</p>
      </div>

      {/* Profile Settings */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
            <User className="w-5 h-5 text-blue-600" />
          </div>
          <h2 className="text-gray-900">Profile Information</h2>
        </div>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" defaultValue="John" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" defaultValue="Smith" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" defaultValue="john.smith@company.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="company">Company Name</Label>
            <Input id="company" defaultValue="Quality Assurance Corp" />
          </div>
          <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
            Save Changes
          </Button>
        </div>
      </Card>

      {/* Notifications */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
            <Bell className="w-5 h-5 text-blue-600" />
          </div>
          <h2 className="text-gray-900">Notification Preferences</h2>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-900">Email Notifications</p>
              <p className="text-gray-600">Receive audit summaries via email</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-900">Compliance Alerts</p>
              <p className="text-gray-600">Get notified about compliance issues</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-900">AI Recommendations</p>
              <p className="text-gray-600">Weekly tips to improve compliance</p>
            </div>
            <Switch defaultChecked />
          </div>
        </div>
      </Card>

      {/* Security */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
            <Lock className="w-5 h-5 text-blue-600" />
          </div>
          <h2 className="text-gray-900">Security</h2>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Current Password</Label>
            <Input id="currentPassword" type="password" placeholder="••••••••" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <Input id="newPassword" type="password" placeholder="••••••••" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <Input id="confirmPassword" type="password" placeholder="••••••••" />
          </div>
          <Button variant="outline">Update Password</Button>
        </div>
      </Card>

      {/* Integrations */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
            <Plug className="w-5 h-5 text-blue-600" />
          </div>
          <div className="flex-1">
            <h2 className="text-gray-900">Platform Integrations</h2>
            <p className="text-gray-600">Connect with your document management systems</p>
          </div>
        </div>
        
        <div className="space-y-3">
          {/* SharePoint */}
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-blue-500 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center">
                <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M15.5 15.5c-2.5 0-4.5-2-4.5-4.5s2-4.5 4.5-4.5 4.5 2 4.5 4.5-2 4.5-4.5 4.5zm-7-1.5c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3z"/>
                </svg>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-gray-900">SharePoint</p>
                  <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    Connected
                  </Badge>
                </div>
                <p className="text-gray-600">Access documents from SharePoint</p>
              </div>
            </div>
            <Button variant="outline" size="sm">Configure</Button>
          </div>

          {/* Google Drive */}
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-blue-500 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-400 via-red-500 to-blue-500 flex items-center justify-center">
                <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7.71 3.5L1.15 15l3.4 6.5L11.1 9.95 7.71 3.5M9.73 15H22.6L19.2 21.5H6.34M19.2 2.5l3.4 6.5-6.56 11.24-3.4-6.49"/>
                </svg>
              </div>
              <div>
                <p className="text-gray-900">Google Drive</p>
                <p className="text-gray-600">Import documents from Drive</p>
              </div>
            </div>
            <Button variant="outline" size="sm">Connect</Button>
          </div>

          {/* OneDrive */}
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-blue-500 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center">
                <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13.62 8.43c-.44-1.84-2.1-3.2-4.07-3.2-2.3 0-4.17 1.87-4.17 4.17 0 .23.02.46.05.68A3.5 3.5 0 0 0 2 13.5C2 15.43 3.57 17 5.5 17h11c2.21 0 4-1.79 4-4 0-2.05-1.54-3.73-3.54-3.95-.3-2.08-2.03-3.68-4.13-3.68-.39 0-.76.05-1.11.15l-.1.11z"/>
                </svg>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-gray-900">OneDrive</p>
                  <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    Connected
                  </Badge>
                </div>
                <p className="text-gray-600">Sync with Microsoft OneDrive</p>
              </div>
            </div>
            <Button variant="outline" size="sm">Configure</Button>
          </div>

          {/* Dropbox */}
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-blue-500 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center">
                <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6 2L0 5.5 6 9 12 5.5 6 2M18 2L12 5.5 18 9 24 5.5 18 2M0 12.5L6 16 12 12.5 6 9 0 12.5M24 12.5L18 9 12 12.5 18 16 24 12.5M6 17.5L12 21 18 17.5 12 14 6 17.5Z"/>
                </svg>
              </div>
              <div>
                <p className="text-gray-900">Dropbox</p>
                <p className="text-gray-600">Link your Dropbox account</p>
              </div>
            </div>
            <Button variant="outline" size="sm">Connect</Button>
          </div>

          {/* Box */}
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-blue-500 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-700 flex items-center justify-center">
                <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 3h18v18H3V3m2 2v14h14V5H5z"/>
                </svg>
              </div>
              <div>
                <p className="text-gray-900">Box</p>
                <p className="text-gray-600">Connect to Box storage</p>
              </div>
            </div>
            <Button variant="outline" size="sm">Connect</Button>
          </div>

          {/* Slack */}
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-blue-500 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-purple-600 flex items-center justify-center">
                <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6 15a2 2 0 0 1-2 2 2 2 0 0 1-2-2 2 2 0 0 1 2-2h2m0-6a2 2 0 0 1-2-2 2 2 0 0 1 2-2 2 2 0 0 1 2 2v2m6 0a2 2 0 0 1 2-2 2 2 0 0 1 2 2 2 2 0 0 1-2 2h-2m0 6a2 2 0 0 1 2 2 2 2 0 0 1-2 2 2 2 0 0 1-2-2v-2m-6 0h6v-6H6v6Z"/>
                </svg>
              </div>
              <div>
                <p className="text-gray-900">Slack</p>
                <p className="text-gray-600">Get notifications in Slack</p>
              </div>
            </div>
            <Button variant="outline" size="sm">Connect</Button>
          </div>
        </div>
      </Card>

    </div>
  );
}
