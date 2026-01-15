import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { 
  Users, 
  Plus, 
  Trash2, 
  ArrowLeft, 
  CheckCircle2,
  Building2,
  ShieldCheck,
  GitBranch,
  FileText,
  Rocket
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const teamMemberSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  role: z.string().min(1, "Role is required"),
});

const adGroupSchema = z.object({
  name: z.string().min(1, "AD Group name is required"),
  type: z.string().min(1, "Type is required"),
});

const repositorySchema = z.object({
  name: z.string().min(1, "Repository name is required"),
  url: z.string().url("Valid URL is required"),
  type: z.string().min(1, "Type is required"),
});

const pipelineSchema = z.object({
  name: z.string().min(1, "Pipeline name is required"),
  type: z.string().min(1, "Type is required"),
  environment: z.string().min(1, "Environment is required"),
});

const documentationSchema = z.object({
  title: z.string().min(1, "Title is required"),
  url: z.string().url("Valid URL is required"),
  type: z.string().min(1, "Type is required"),
});

const onboardingFormSchema = z.object({
  teamName: z.string().min(2, "Team name must be at least 2 characters"),
  teamDescription: z.string().min(10, "Please provide a brief description"),
  applicationName: z.string().min(2, "Application name is required"),
  applicationId: z.string().min(1, "Application ID is required"),
  adGroups: z.array(adGroupSchema).min(1, "At least one AD group is required"),
  teamMembers: z.array(teamMemberSchema).min(1, "At least one team member is required"),
  repositories: z.array(repositorySchema),
  pipelines: z.array(pipelineSchema),
  documentation: z.array(documentationSchema),
});

type OnboardingFormValues = z.infer<typeof onboardingFormSchema>;

const defaultValues: Partial<OnboardingFormValues> = {
  teamName: "",
  teamDescription: "",
  applicationName: "",
  applicationId: "",
  adGroups: [{ name: "", type: "read" }],
  teamMembers: [{ name: "", email: "", role: "member" }],
  repositories: [],
  pipelines: [],
  documentation: [],
};

export default function TeamOnboarding() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<OnboardingFormValues>({
    resolver: zodResolver(onboardingFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const adGroupsArray = useFieldArray({
    control: form.control,
    name: "adGroups",
  });

  const teamMembersArray = useFieldArray({
    control: form.control,
    name: "teamMembers",
  });

  const repositoriesArray = useFieldArray({
    control: form.control,
    name: "repositories",
  });

  const pipelinesArray = useFieldArray({
    control: form.control,
    name: "pipelines",
  });

  const documentationArray = useFieldArray({
    control: form.control,
    name: "documentation",
  });

  const onSubmit = async (data: OnboardingFormValues) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("Form submitted:", data);
    setIsSubmitting(false);
    setIsSuccess(true);
    toast.success("Team onboarding request submitted successfully!");
  };

  if (isSuccess) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <Card className="w-full max-w-lg text-center">
          <CardHeader>
            <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <CardTitle className="text-2xl">Onboarding Request Submitted!</CardTitle>
            <CardDescription className="text-base mt-2">
              Your team onboarding request has been submitted successfully. Our team will review your request and get back to you within 2-3 business days.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={() => navigate("/teams")} className="w-full">
              View Teams
            </Button>
            <Button variant="outline" onClick={() => navigate("/")} className="w-full">
              Back to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Team Onboarding</h1>
          <p className="text-muted-foreground mt-1">
            Complete the form below to onboard your team to the DevPortal
          </p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Team Information */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-primary" />
                <CardTitle>Team Information</CardTitle>
              </div>
              <CardDescription>Basic information about your team and application</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="teamName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Team Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Platform Engineering" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="applicationId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Application ID *</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., APP-12345" {...field} />
                      </FormControl>
                      <FormDescription>Unique identifier from your CMDB</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="applicationName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Application Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Customer Portal" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="teamDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Team Description *</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Briefly describe your team's purpose and responsibilities..."
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* AD Groups */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                  <CardTitle>AD Groups</CardTitle>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => adGroupsArray.append({ name: "", type: "read" })}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Group
                </Button>
              </div>
              <CardDescription>Active Directory groups for access management</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {adGroupsArray.fields.map((field, index) => (
                <div key={field.id} className="flex gap-3 items-start">
                  <FormField
                    control={form.control}
                    name={`adGroups.${index}.name`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel className={index !== 0 ? "sr-only" : undefined}>
                          Group Name *
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., TEAM-PLATFORM-DEV" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`adGroups.${index}.type`}
                    render={({ field }) => (
                      <FormItem className="w-[140px]">
                        <FormLabel className={index !== 0 ? "sr-only" : undefined}>
                          Access Type *
                        </FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="read">Read</SelectItem>
                            <SelectItem value="write">Write</SelectItem>
                            <SelectItem value="admin">Admin</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {adGroupsArray.fields.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="mt-8"
                      onClick={() => adGroupsArray.remove(index)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Team Members */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  <CardTitle>Team Members</CardTitle>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => teamMembersArray.append({ name: "", email: "", role: "member" })}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Member
                </Button>
              </div>
              <CardDescription>Add team members who will have access to this workspace</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {teamMembersArray.fields.map((field, index) => (
                <div key={field.id} className="flex gap-3 items-start">
                  <FormField
                    control={form.control}
                    name={`teamMembers.${index}.name`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel className={index !== 0 ? "sr-only" : undefined}>
                          Name *
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Full name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`teamMembers.${index}.email`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel className={index !== 0 ? "sr-only" : undefined}>
                          Email *
                        </FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="email@company.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`teamMembers.${index}.role`}
                    render={({ field }) => (
                      <FormItem className="w-[140px]">
                        <FormLabel className={index !== 0 ? "sr-only" : undefined}>
                          Role *
                        </FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Role" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="lead">Team Lead</SelectItem>
                            <SelectItem value="member">Member</SelectItem>
                            <SelectItem value="viewer">Viewer</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {teamMembersArray.fields.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="mt-8"
                      onClick={() => teamMembersArray.remove(index)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Repositories */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <GitBranch className="h-5 w-5 text-primary" />
                  <CardTitle>Repositories</CardTitle>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => repositoriesArray.append({ name: "", url: "", type: "application" })}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Repository
                </Button>
              </div>
              <CardDescription>Link your code repositories (optional)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {repositoriesArray.fields.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No repositories added yet. Click "Add Repository" to add one.
                </p>
              ) : (
                repositoriesArray.fields.map((field, index) => (
                  <div key={field.id} className="flex gap-3 items-start">
                    <FormField
                      control={form.control}
                      name={`repositories.${index}.name`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel className={index !== 0 ? "sr-only" : undefined}>
                            Repository Name *
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., frontend-app" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`repositories.${index}.url`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel className={index !== 0 ? "sr-only" : undefined}>
                            URL *
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="https://github.com/org/repo" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`repositories.${index}.type`}
                      render={({ field }) => (
                        <FormItem className="w-[140px]">
                          <FormLabel className={index !== 0 ? "sr-only" : undefined}>
                            Type *
                          </FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="application">Application</SelectItem>
                              <SelectItem value="infrastructure">Infrastructure</SelectItem>
                              <SelectItem value="library">Library</SelectItem>
                              <SelectItem value="config">Config</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="mt-8"
                      onClick={() => repositoriesArray.remove(index)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          {/* Pipelines */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Rocket className="h-5 w-5 text-primary" />
                  <CardTitle>Pipelines</CardTitle>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => pipelinesArray.append({ name: "", type: "build", environment: "dev" })}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Pipeline
                </Button>
              </div>
              <CardDescription>CI/CD pipelines for your application (optional)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {pipelinesArray.fields.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No pipelines added yet. Click "Add Pipeline" to add one.
                </p>
              ) : (
                pipelinesArray.fields.map((field, index) => (
                  <div key={field.id} className="flex gap-3 items-start">
                    <FormField
                      control={form.control}
                      name={`pipelines.${index}.name`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel className={index !== 0 ? "sr-only" : undefined}>
                            Pipeline Name *
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Build & Deploy" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`pipelines.${index}.type`}
                      render={({ field }) => (
                        <FormItem className="w-[140px]">
                          <FormLabel className={index !== 0 ? "sr-only" : undefined}>
                            Type *
                          </FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="build">Build</SelectItem>
                              <SelectItem value="deploy">Deploy</SelectItem>
                              <SelectItem value="test">Test</SelectItem>
                              <SelectItem value="release">Release</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`pipelines.${index}.environment`}
                      render={({ field }) => (
                        <FormItem className="w-[140px]">
                          <FormLabel className={index !== 0 ? "sr-only" : undefined}>
                            Environment *
                          </FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Env" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="dev">Development</SelectItem>
                              <SelectItem value="staging">Staging</SelectItem>
                              <SelectItem value="prod">Production</SelectItem>
                              <SelectItem value="all">All</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="mt-8"
                      onClick={() => pipelinesArray.remove(index)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          {/* Documentation */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  <CardTitle>Documentation</CardTitle>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => documentationArray.append({ title: "", url: "", type: "wiki" })}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Documentation
                </Button>
              </div>
              <CardDescription>Link relevant documentation and runbooks (optional)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {documentationArray.fields.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No documentation added yet. Click "Add Documentation" to add one.
                </p>
              ) : (
                documentationArray.fields.map((field, index) => (
                  <div key={field.id} className="flex gap-3 items-start">
                    <FormField
                      control={form.control}
                      name={`documentation.${index}.title`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel className={index !== 0 ? "sr-only" : undefined}>
                            Title *
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., API Documentation" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`documentation.${index}.url`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel className={index !== 0 ? "sr-only" : undefined}>
                            URL *
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="https://wiki.company.com/doc" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`documentation.${index}.type`}
                      render={({ field }) => (
                        <FormItem className="w-[140px]">
                          <FormLabel className={index !== 0 ? "sr-only" : undefined}>
                            Type *
                          </FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="wiki">Wiki</SelectItem>
                              <SelectItem value="runbook">Runbook</SelectItem>
                              <SelectItem value="api">API Docs</SelectItem>
                              <SelectItem value="architecture">Architecture</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="mt-8"
                      onClick={() => documentationArray.remove(index)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          {/* Submit */}
          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => navigate("/")}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Onboarding Request"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
