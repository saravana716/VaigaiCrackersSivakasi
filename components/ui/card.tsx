import * as React from "react";

function Card({ style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      style={{
        backgroundColor: "#ffffff",
        color: "#000000",
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
        borderRadius: "0.75rem",
        border: "1px solid #e5e7eb",
        ...style,
      }}
      {...props}
    />
  );
}

function CardHeader({ style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      style={{
        display: "grid",
        rowGap: "0.375rem",
        alignItems: "start",
        padding: "1.5rem 1.5rem 0 1.5rem",
        ...style,
      }}
      {...props}
    />
  );
}

function CardTitle({ style, ...props }: React.ComponentProps<"div">) {
  return (
    <h4
      data-slot="card-title"
      style={{
        lineHeight: "1",
        fontWeight: "600",
        fontSize: "1.125rem",
        ...style,
      }}
      {...props}
    />
  );
}

function CardDescription({ style, ...props }: React.ComponentProps<"div">) {
  return (
    <p
      data-slot="card-description"
      style={{
        color: "#6b7280", // muted text color
        fontSize: "0.875rem",
        ...style,
      }}
      {...props}
    />
  );
}

function CardAction({ style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      style={{
        gridColumnStart: 2,
        gridRow: "1 / span 2",
        alignSelf: "start",
        justifySelf: "end",
        ...style,
      }}
      {...props}
    />
  );
}

function CardContent({ style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      style={{
        paddingLeft: "1.5rem",
        paddingRight: "1.5rem",
        paddingBottom: "1.5rem",
        ...style,
      }}
      {...props}
    />
  );
}

function CardFooter({ style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      style={{
        display: "flex",
        alignItems: "center",
        paddingLeft: "1.5rem",
        paddingRight: "1.5rem",
        paddingBottom: "1.5rem",
        paddingTop: "1.5rem",
        borderTop: "1px solid #e5e7eb",
        ...style,
      }}
      {...props}
    />
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
};
