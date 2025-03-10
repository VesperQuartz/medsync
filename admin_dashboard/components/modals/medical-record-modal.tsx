"use client";

import { useState } from "react";
import { FileText } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useGetMedicalRecords, useGetUserMedicalRecords } from "@/app/hooks";
import React from "react";
import { Name } from "../name";

export function MedicalRecordModal({
  children,
  id,
}: {
  children: React.ReactNode;
  id: number;
}) {
  const [activeTab, setActiveTab] = useState("records");
  const medicalRecord = useGetUserMedicalRecords(id);

  const records =
    React.useMemo(() => medicalRecord?.data, [medicalRecord.data]) ?? [];
  const initials = "Med Sync"
    .split(" ")
    .map((n) => n[0])
    .join("");

  const recordTypeColors = {
    consultation: "bg-blue-50 text-blue-800 hover:bg-blue-100 border-blue-300",
    lab: "bg-purple-50 text-purple-800 hover:bg-purple-100 border-purple-300",
    surgery: "bg-red-50 text-red-800 hover:bg-red-100 border-red-300",
    prescription:
      "bg-green-50 text-green-800 hover:bg-green-100 border-green-300",
    "follow-up":
      "bg-yellow-50 text-yellow-800 hover:bg-yellow-100 border-yellow-300",
  };

  return (
    <>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="flex items-center">
              <Avatar className="h-8 w-8 mr-2">
                <AvatarImage src="/placeholder.svg" alt={"adam"} />
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
              <span>
                <Name id={id} />
              </span>
            </div>
          </DialogTitle>
          <DialogDescription>Medical records and history</DialogDescription>
        </DialogHeader>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="flex-1 flex flex-col"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="records">Medical Records</TabsTrigger>
          </TabsList>
          <TabsContent value="records" className="flex-1 flex flex-col">
            <ScrollArea className="flex-1 pr-4 -mr-4">
              {records!.length > 0 ? (
                <div className="space-y-4 mt-2">
                  {records?.map((record) => (
                    <div key={1} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center">
                          <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span className="font-medium">{1}</span>
                        </div>
                        {/* <Badge */}
                        {/*   variant="outline" */}
                        {/*   className={ */}
                        {/*     recordTypeColors[ */}
                        {/*       record.type as keyof typeof recordTypeColors */}
                        {/*     ] */}
                        {/*   } */}
                        {/* > */}
                        {/*   {record.type.charAt(0).toUpperCase() + */}
                        {/*     record.type.slice(1)} */}
                        {/* </Badge> */}
                      </div>

                      <div className="grid grid-cols-2 gap-2 mb-2">
                        <div>
                          <p className="text-sm text-muted-foreground">Date</p>
                          <p className="font-medium">
                            {new Date(record?.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              },
                            )}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Doctor
                          </p>
                          <p className="font-medium text-blue-600">
                            <Name id={record.doctorId} />
                          </p>
                        </div>
                      </div>

                      <Separator className="my-2" />

                      <div className="space-y-2">
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Diagnosis
                          </p>
                          <p className="font-medium">{record.diagnosis}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Treatment
                          </p>
                          <p>{record?.prescription}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center h-40">
                  <p className="text-muted-foreground">
                    No medical records found for this patient.
                  </p>
                </div>
              )}
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </>
  );
}
