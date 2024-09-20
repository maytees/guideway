"use client";
import { X } from "lucide-react";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { Alert, AlertDescription } from "~/components/ui/alert";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { type Tag } from "~/lib/types";
import { colors } from "~/lib/utils";

type RoleTagSelectorProps = {
  tags: Tag[];
  setTags: React.Dispatch<React.SetStateAction<Tag[]>>;
  isPending: boolean;
};

const RoleTagSelector: React.FC<RoleTagSelectorProps> = ({
  tags,
  setTags,
  isPending,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [selectedColor, setSelectedColor] = useState(colors[0]);

  const handleAddTag = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (inputValue.trim() && tags.length < 3) {
      setTags([
        ...tags,
        { value: inputValue.trim(), color: selectedColor?.bg ?? "#000000" },
      ]);
      setInputValue("");
    }
  };

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="tag-selector">
        <AccordionTrigger>
          Tags{" "}
          <span className="text-xs font-normal text-muted-foreground">
            - let users know more about your post
          </span>
        </AccordionTrigger>
        <AccordionContent className="m-1">
          <div className="space-y-4">
            {tags.length >= 3 && (
              <Alert variant="destructive">
                <AlertDescription>
                  You can only add up to 3 tags.
                </AlertDescription>
              </Alert>
            )}
            <div className="flex space-x-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="e.g Announcement"
                disabled={tags.length >= 3 || isPending}
              />
              <Button
                onClick={handleAddTag}
                disabled={tags.length >= 3 || isPending}
              >
                Add Tag
              </Button>
            </div>
            <RadioGroup
              defaultValue={colors[0]?.bg}
              onValueChange={(value) =>
                setSelectedColor(colors.find((c) => c.bg === value))
              }
              className="grid grid-cols-11 gap-2"
            >
              {colors.map((color) => (
                <div key={color.bg}>
                  <RadioGroupItem
                    value={color.bg}
                    id={color.bg}
                    className="peer sr-only"
                    disabled={isPending}
                  />
                  <Label
                    htmlFor={color.bg}
                    className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border-2 border-transparent peer-data-[state=checked]:border-black"
                    style={{ backgroundColor: color.bg }}
                  >
                    <span className="sr-only">{color.bg}</span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
            <div className="mt-4">
              <h3 className="mb-2 text-sm font-medium">
                Current Tags ({tags.length}/3):
              </h3>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => {
                  const colorObj =
                    colors.find((c) => c.bg === tag.color) ?? colors[0];
                  return (
                    <span
                      key={index}
                      className={`flex items-center gap-1 rounded px-2 py-1 text-sm font-semibold`}
                      style={{
                        backgroundColor: colorObj?.bg ?? colors[0]?.bg,
                        color: colorObj?.text ?? colors[0]?.text,
                      }}
                    >
                      {tag.value}
                      <Button
                        size={"icon"}
                        variant={"link"}
                        className="ml-2 h-4 w-4 p-0 text-xs hover:text-opacity-75"
                        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                          e.preventDefault();
                          setTags(tags.filter((_, i) => i !== index));
                        }}
                        aria-label={`Remove ${tag.value} tag`}
                        disabled={isPending}
                      >
                        <X
                          className="h-4 w-4"
                          style={{ color: colorObj?.text ?? colors[0]?.text }}
                        />
                      </Button>
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default RoleTagSelector;
