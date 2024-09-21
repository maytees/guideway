import fs from "fs";
import matter from "gray-matter";
import path from "path";
import ReactMarkdown from "react-markdown";
import { Separator } from "~/components/ui/separator";

const ChangelogPage = () => {
    const changelogDir = path.join(process.cwd(), "changelogs");
    const changelogs = fs.readdirSync(changelogDir).map((filename) => {
        const filePath = path.join(changelogDir, filename);
        const fileContent = fs.readFileSync(filePath, "utf-8");
        const { data, content } = matter(fileContent);
        return { date: data.date, content, title: data.title };
    });

    return (
        <div className="px-80 py-12">
            <div className="text-left mb-8">
                <h1 className="text-4xl font-bold mb-2">Changelog</h1>
                <p className="text-lg text-muted-foreground">Stay updated with our latest features and improvements</p>
            </div>
            <ul className="space-y-6">
                {changelogs.reverse().map((log, index) => (
                    <div>
                        <Separator />
                        <li key={index} className="bg-white p-6">
                            <div className="mb-4">
                                <h2 className="text-xl font-semibold">{log.title}</h2>
                                <p className="text-sm text-gray-500">{log.date}</p>
                            </div>
                            <div className="prose prose-lg">
                                <ReactMarkdown>{log.content}</ReactMarkdown>
                            </div>
                        </li>
                    </div>
                ))}
            </ul>
        </div>
    );
};

export default ChangelogPage;
