import { ReactNode } from 'react'; 
import { ClerkProvider as OriginalClerkProvider } from '@clerk/nextjs';
import { buttonVariants } from '@/components/ui/button';

export function ClerkProvider({ children }: { children: ReactNode }) {
	return (
    <OriginalClerkProvider
      appearance={{
        cssLayerName: "vendor",
        variables: {
          colorBackground: "var(--color-background)",
          borderRadius: "var(--radius-md)",
          colorBorder: "var(--color-secondary-foreground)",
          colorDanger: "var(--color-destructive)",
          colorForeground: "var(--color-foreground)",
          colorPrimary: "var(--color-primary)",
          colorPrimaryForeground: "var(--color-primary-foreground)",
          colorInput: "var(--color-input)",
          colorInputForeground: "var(--color-text)",
          colorMuted: "var(--color-muted)",
          colorMutedForeground: "var(--color-muted-foreground)",
          colorNeutral: "var(--color-secondary-foreground)",
          colorRing: "var(--color-ring)",
          colorShadow: "var(--color-shadow-color)",
          colorSuccess: "var(--color-primary)",
          colorWarning: "var(--color-warning)",
          fontFamily: "var(--font-sans)",
          fontFamilyButtons: "var(--font-sans)",
        },
        elements: {
          pricingTableCard:
          "custom-pricing-table bg-none bg-[unset] border border-border p-6 my-3",
          pricingTableCardHeader: "p-0 pb-12",
          pricingTableCardFreeTitle: "text-xl",
          pricingTableCardBody: "flex flex-col justify-end bg-none bg-[unset]",
          pricingTableCardDescription: "text-sm text-muted-foreground mb-2",
          pricingTableCardFooter: "border-none p-0 pt-8",
          pricingTableCardFooterButton: buttonVariants(),
        }
      }}
    >
      {children}
    </OriginalClerkProvider>
  );
}