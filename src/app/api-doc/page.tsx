import { getApiDocs } from "@/lib/swagger";
import ReactSwagger from "../ui/pages/api-doc-page";

export default async function IndexPage() {
  const spec = await getApiDocs();
  return (
    <section className="container">
      <ReactSwagger spec={spec} />
    </section>
  );
}
