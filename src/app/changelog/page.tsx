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
        const { content } = matter(fileContent);
        return {
            content: content,
        };
    });

    return (
        <div className="px-4 sm:px-6 md:px-8 lg:px-16 xl:px-32 2xl:px-64 py-8 sm:py-12">
            <div className="text-left mb-6 sm:mb-8">
                <h1 className="text-3xl sm:text-4xl font-bold mb-2">Changelog</h1>
                <p className="text-base sm:text-lg text-muted-foreground">Stay updated with our latest features and improvements</p>
            </div>
            <ul className="space-y-4 sm:space-y-6">
                {changelogs.reverse().map((log, index) => (
                    <div key={index}>
                        <Separator />
                        <li key={index} className="bg-background p-4 sm:p-6 rounded-lg">
                            <div className="prose prose-lg dark:prose-invert max-w-none">
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
