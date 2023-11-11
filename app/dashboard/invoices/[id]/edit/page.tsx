import Form from "@/app/ui/invoices/edit-form";
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import { fetchCustomers, fetchInvoiceById } from "@/app/lib/data";
import { InvoiceForm } from "@app/lib/definitions";
interface Props {
  params: { id: string };
}
export default async function Page({ params }: Props) {
  const id = params.id;
  const [invoice, customers] = await Promise.all([
    fetchInvoiceById(id),
    fetchCustomers(),
  ]);
  //* For sake of Type Assertion
  const currInvoice = invoice as InvoiceForm;
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Invoices", href: "/dashboard/invoices" },
          {
            label: "Edit Invoice",
            href: `/dashboard/invoices/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form invoice={currInvoice} customers={customers} />
    </main>
  );
}
