import { Spinner } from "@heroui/react";

export default function SmallSpinner({ filter }) {
  return (
    <Spinner
      classNames={{ label: "text-foreground mt-4" }}
      variant="simple"
      color={filter === "all" ? "primary" : "dark"}
      size="md"
    />
  );
}
