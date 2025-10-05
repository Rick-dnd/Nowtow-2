'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { User, Lock, Bell, CreditCard } from 'lucide-react';

export default function SettingsPage(): React.ReactElement {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your account settings and preferences</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile" className="flex items-center">
            <User className="h-4 w-4 mr-2" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="account" className="flex items-center">
            <Lock className="h-4 w-4 mr-2" />
            Account
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="billing" className="flex items-center">
            <CreditCard className="h-4 w-4 mr-2" />
            Billing
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your personal details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarFallback>MM</AvatarFallback>
                </Avatar>
                <div className="space-x-2">
                  <Button variant="outline">Change Photo</Button>
                  <Button variant="ghost">Remove</Button>
                </div>
              </div>

              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" defaultValue="@username" />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="fullname">Full Name</Label>
                  <Input id="fullname" defaultValue="Max Mustermann" />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    placeholder="Tell us about yourself..."
                    className="min-h-[100px]"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" defaultValue="München, Germany" />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="website">Website</Label>
                  <Input id="website" placeholder="https://" />
                </div>

                <div className="grid gap-2">
                  <Label>Languages</Label>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center space-x-2">
                      <Switch id="lang-de" defaultChecked />
                      <Label htmlFor="lang-de">Deutsch</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="lang-en" defaultChecked />
                      <Label htmlFor="lang-en">English</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="lang-es" />
                      <Label htmlFor="lang-es">Español</Label>
                    </div>
                  </div>
                </div>
              </div>

              <Button className="bg-gradient-to-r from-primary to-emerald-600">
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Account Tab */}
        <TabsContent value="account" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Account Security</CardTitle>
              <CardDescription>Manage your account security settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Email</Label>
                <div className="flex items-center space-x-2">
                  <Input value="max@example.com" disabled />
                  <Button variant="outline">Change</Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Password</Label>
                <div className="flex items-center space-x-2">
                  <Input type="password" value="••••••••••••" disabled />
                  <Button variant="outline">Change</Button>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">Two-Factor Authentication</p>
                  <p className="text-sm text-muted-foreground">
                    Add an extra layer of security
                  </p>
                </div>
                <Button variant="outline">Enable</Button>
              </div>

              <div className="pt-6 border-t">
                <h4 className="font-semibold text-red-600 mb-2">Danger Zone</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Once you delete your account, there is no going back.
                </p>
                <Button variant="destructive">Delete Account</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Choose what updates you want to receive</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-medium mb-4">Email Notifications</h4>
                <div className="space-y-4">
                  {[
                    { id: 'new-bookings', label: 'New Bookings' },
                    { id: 'new-reviews', label: 'New Reviews' },
                    { id: 'new-messages', label: 'New Messages' },
                    { id: 'marketing', label: 'Marketing Emails' },
                  ].map((item) => (
                    <div key={item.id} className="flex items-center justify-between">
                      <Label htmlFor={item.id}>{item.label}</Label>
                      <Switch id={item.id} defaultChecked={item.id !== 'marketing'} />
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t">
                <h4 className="font-medium mb-4">Push Notifications</h4>
                <div className="space-y-4">
                  {[
                    { id: 'push-bookings', label: 'Booking Reminders' },
                    { id: 'push-payments', label: 'Payment Confirmations' },
                  ].map((item) => (
                    <div key={item.id} className="flex items-center justify-between">
                      <Label htmlFor={item.id}>{item.label}</Label>
                      <Switch id={item.id} defaultChecked />
                    </div>
                  ))}
                </div>
              </div>

              <Button className="bg-gradient-to-r from-primary to-emerald-600">
                Save Preferences
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Billing Tab */}
        <TabsContent value="billing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Billing & Subscription</CardTitle>
              <CardDescription>Manage your subscription and payment methods</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">Current Plan</h4>
                  <Badge className="bg-gradient-to-r from-primary to-emerald-600">Plus</Badge>
                </div>
                <p className="text-2xl font-bold mb-1">€5/month</p>
                <p className="text-sm text-muted-foreground">
                  Renews on October 15, 2024
                </p>
              </div>

              <div className="space-y-2">
                <Button className="w-full" variant="outline">
                  Upgrade to Premium
                </Button>
                <Button className="w-full" variant="ghost">
                  Cancel Subscription
                </Button>
              </div>

              <div className="pt-6 border-t">
                <h4 className="font-medium mb-4">Payment Method</h4>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-blue-400 rounded flex items-center justify-center text-white text-xs font-bold">
                      VISA
                    </div>
                    <div>
                      <p className="font-medium">•••• 1234</p>
                      <p className="text-sm text-muted-foreground">Expires 12/25</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Update
                  </Button>
                </div>
              </div>

              <div className="pt-6 border-t">
                <Button variant="outline" className="w-full">
                  View Billing History
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
