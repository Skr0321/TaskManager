"use client";

import { Controller, useController } from "react-hook-form";
import { FORM_TYPES } from "./Form.types";
import { cn } from "@/lib/utils";
import { CalendarIcon, CircleCheck } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { useState } from "react";

const FormField = ({ field, formRegister, formControl, errors }) => {
  const { field: controlField } = useController({
    name: field.fieldName,
    control: formControl,
  });
  const [open, setOpen] = useState(false);
  // Function to format date using Intl.DateTimeFormat
  const formatDate = (date) =>
    date
      ? new Intl.DateTimeFormat("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }).format(new Date(date))
      : "";

  switch (field.type) {
    case FORM_TYPES.TEXT:
      return (
        <div className="flex flex-col gap-[4px]">
          <Label htmlFor={field.fieldName}>{field.fieldLabel}</Label>
          {field.prefix ? (
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                {field.prefix}
              </span>
              <Input
                id={field.fieldName}
                {...formRegister(field.fieldName)}
                type="text"
                disabled={field.isDisabled}
                placeholder={field.placeholder}
                className={cn(
                  errors[field.fieldName]?.message
                    ? "error-border ring-0 focus-visible:ring-0"
                    : ""
                )}
              />
            </div>
          ) : (
            <Input
              id={field.fieldName}
              {...formRegister(field.fieldName)}
              type="text"
              disabled={field.isDisabled}
              placeholder={field.placeholder}
              className={cn(
                errors[field.fieldName]?.message
                  ? "error-border ring-0 focus-visible:ring-0"
                  : "border border-main"
              )}
            />
          )}
          {errors[field.fieldName]?.message && (
            <p className="text-[10px] text-red-500">
              {errors[field.fieldName]?.message?.toString()}
            </p>
          )}
        </div>
      );

    case FORM_TYPES.TEXTAREA:
      return (
        <div className="flex flex-col gap-[4px]">
          <Label htmlFor={field.fieldName}>{field.fieldLabel}</Label>
          <Textarea
            id={field.fieldName}
            {...formRegister(field.fieldName)}
            disabled={field.isDisabled}
            placeholder={field.placeholder}
            className={cn(
              errors[field.fieldName]?.message
                ? "error-border ring-0 focus-visible:ring-0"
                : "border border-main"
            )}
          />
          {errors[field.fieldName]?.message && (
            <p className="text-[10px] text-red-500">
              {errors[field.fieldName]?.message?.toString()}
            </p>
          )}
        </div>
      );

    case FORM_TYPES.NUMBER:
      return (
        <div className="flex flex-col gap-[4px]">
          <Label htmlFor={field.fieldName}>{field.fieldLabel}</Label>
          <Input
            style={{ minWidth: "200px" }}
            id={field.fieldName}
            {...formRegister(field.fieldName, { valueAsNumber: true })}
            type="number"
            disabled={field.isDisabled}
            placeholder={field.placeholder}
            className={cn(
              errors[field.fieldName]?.message
                ? "error-border ring-0 focus-visible:ring-0"
                : "border border-main"
            )}
          />
          {errors[field.fieldName]?.message && (
            <p className="text-[10px] text-red-500">
              {errors[field.fieldName]?.message?.toString()}
            </p>
          )}
          {field.subtext && <p className="text-[10px]">{field.subtext}</p>}
        </div>
      );

    case FORM_TYPES.EMAIL:
      return (
        <div className="flex flex-col gap-[4px]">
          <Label htmlFor={field.fieldName}>{field.fieldLabel}</Label>
          <Input
            style={{ minWidth: "200px" }}
            id={field.fieldName}
            {...formRegister(field.fieldName)}
            type="email"
            disabled={field.isDisabled}
            placeholder={field.placeholder}
            className={cn(
              errors[field.fieldName]?.message
                ? "error-border ring-0 focus-visible:ring-0"
                : "border border-main"
            )}
          />
          {errors[field.fieldName]?.message && (
            <p className="text-[10px] text-red-500">
              {errors[field.fieldName]?.message?.toString()}
            </p>
          )}
        </div>
      );

    case FORM_TYPES.RADIO:
      return (
        <div className="flex flex-col gap-[4px]">
          <Label className="mb-5">{field.fieldLabel}</Label>
          <RadioGroup
            id={field.fieldName}
            onValueChange={controlField.onChange}
            value={controlField.value}
            className="flex flex-col gap-2"
          >
            {field.options?.map((option) => (
              <div
                key={option.value}
                className="flex items-center gap-4 space-x-2"
              >
                <RadioGroupItem
                  value={option.value}
                  id={`${field.fieldName}-${option.value}`}
                  disabled={field.isDisabled}
                  className="bg-custom-primary text-white"
                />
                <div className="flex flex-col item-center gap-2">
                  <Label htmlFor={`${field.fieldName}-${option.value}`}>
                    {option.label}
                  </Label>
                  {option.subheading && (
                    <span className="text-sm text-gray-500">
                      {option.subheading}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </RadioGroup>
          {errors[field.fieldName]?.message && (
            <p className="text-[10px] text-red-500">
              {errors[field.fieldName]?.message?.toString()}
            </p>
          )}
        </div>
      );

    case FORM_TYPES.PASSWORD:
      return (
        <div className="flex flex-col gap-[4px]">
          <Label htmlFor={field.fieldName}>{field.fieldLabel}</Label>
          <Input
            style={{ minWidth: "200px" }}
            id={field.fieldName}
            {...formRegister(field.fieldName)}
            type="password"
            disabled={field.isDisabled}
            placeholder={field.placeholder}
            className={cn(
              errors[field.fieldName]?.message
                ? "error-border ring-0 focus-visible:ring-0"
                : "border border-main"
            )}
          />
          {errors[field.fieldName]?.message && (
            <p className="text-[10px] text-red-500">
              {errors[field.fieldName]?.message?.toString()}
            </p>
          )}
          {field.showPassDetail && (
            <div>
              <h6>PASSWORD MUST HAVE:</h6>
              <div className="flex gap-4 mt-3">
                <CircleCheck color="#2bff00" strokeWidth={3} />
                <p>At least 6 characters</p>
              </div>
              <div className="flex gap-4">
                <CircleCheck color="#2bff00" strokeWidth={3} />
                <p>Maximum 20 characters</p>
              </div>
            </div>
          )}
        </div>
      );

    case FORM_TYPES.DATE:
      return (
        <div className="flex flex-col gap-[4px]">
          <Label htmlFor={field.fieldName}>{field.fieldLabel}</Label>
          <Input
            style={{ minWidth: "200px" }}
            id={field.fieldName}
            {...formRegister(field.fieldName)}
            type="date"
            disabled={field.isDisabled}
            placeholder={field.placeholder}
            className={cn(
              errors[field.fieldName]?.message
                ? "error-border ring-0 focus-visible:ring-0"
                : ""
            )}
          />
          {errors[field.fieldName]?.message && (
            <p className="text-[10px] text-red-500">
              {errors[field.fieldName]?.message?.toString()}
            </p>
          )}
        </div>
      );

    case FORM_TYPES.DATE_PICKER:
      return (
        <div className="flex flex-col gap-[4px]">
          <Label htmlFor={field.fieldName}>{field.fieldLabel}</Label>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full pl-3 text-left font-normal bg-2 border-main text-secondarry",
                  !controlField.value && "text-muted-foreground",
                  errors[field.fieldName]?.message
                    ? "error-border ring-0 focus-visible:ring-0"
                    : ""
                )}
              >
                {controlField.value ? (
                  formatDate(controlField.value)
                ) : (
                  <span>{field.placeholder || "MM/DD/YYYY"}</span>
                )}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto p-0 bg-2 border-main primary-text"
              align="start"
            >
              <Calendar
                mode="single"
                selected={controlField.value}
                onSelect={(date) => {
                  controlField.onChange(date), setOpen(false);
                }}
                initialFocus
                className="primary-text"
              />
            </PopoverContent>
          </Popover>
          {errors[field.fieldName]?.message && (
            <p className="text-[10px] text-red-500">
              {errors[field.fieldName]?.message?.toString()}
            </p>
          )}
        </div>
      );

    case FORM_TYPES.SELECT:
      return (
        <div className="flex flex-col gap-[4px]">
          <Label htmlFor={field.fieldName}>{field.fieldLabel}</Label>
          <Controller
            name={field.fieldName}
            control={formControl}
            render={({ field: { onChange, value } }) => (
              <Select onValueChange={onChange} value={value || ""}>
                <SelectTrigger className="w-full border border-main">
                  {value ? (
                    <span>
                      {field.options.find((opt) => opt.value == value)?.label ||
                        field.placeholder}
                    </span>
                  ) : (
                    <span>{field.placeholder}</span>
                  )}
                </SelectTrigger>
                <SelectContent>
                  {field.options.map((item, id) => (
                    <SelectItem value={item.value} key={id}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors[field.fieldName]?.message && (
            <p className="text-[10px] text-red-500">
              {errors[field.fieldName]?.message?.toString()}
            </p>
          )}
        </div>
      );

    default:
      return (
        <div className="flex flex-col gap-[6px]">
          <Label htmlFor={field.fieldName}>{field.fieldLabel}</Label>
          <Input
            id={field.fieldName}
            {...formRegister(field.fieldName)}
            disabled={field.isDisabled}
            placeholder={field.placeholder}
            className={cn(
              errors[field.fieldName]?.message
                ? "error-border ring-0 focus-visible:ring-0"
                : ""
            )}
          />
          {errors[field.fieldName]?.message && (
            <p className="text-[10px] text-red-500">
              {errors[field.fieldName]?.message?.toString()}
            </p>
          )}
        </div>
      );
  }
};

export { FormField };
