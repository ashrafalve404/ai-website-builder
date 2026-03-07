import EditorClient from "./EditorClient";

export function generateStaticParams() {
  // Pre-defined project IDs for static export
  // These represent sample projects that will be pre-rendered
  const projectIds = [
    // Numeric IDs
    "1", "2", "3", "4", "5", "6", "7", "8", "9", "10",
    "11", "12", "13", "14", "15", "20", "50", "100",
    // Alphanumeric IDs
    "abc123", "def456", "xyz789", "demo1", "test1",
    "project-1", "project-2", "sample", "example", "my-site",
    // Common patterns
    "user-001", "user-002", "site-alpha", "site-beta",
  ];
  
  return projectIds.map((id) => ({ id }));
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditorPage({ params }: PageProps) {
  const { id } = await params;
  return <EditorClient id={id} />;
}
