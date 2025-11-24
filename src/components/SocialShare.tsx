import { Button } from "@/components/ui/button";
import { Share2, Twitter, Linkedin, Facebook, Link as LinkIcon } from "lucide-react";
import { toast } from "sonner";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SocialShareProps {
    title: string;
    url: string;
}

const SocialShare = ({ title, url }: SocialShareProps) => {
    const shareUrl = encodeURIComponent(url);
    const shareTitle = encodeURIComponent(title);

    const shareLinks = {
        twitter: `https://twitter.com/intent/tweet?text=${shareTitle}&url=${shareUrl}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(url);
        toast.success("Link copied to clipboard!");
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                    <Share2 className="h-4 w-4" />
                    Share
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem
                    onClick={() => window.open(shareLinks.twitter, "_blank")}
                    className="gap-2 cursor-pointer"
                >
                    <Twitter className="h-4 w-4" />
                    Share on Twitter
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => window.open(shareLinks.linkedin, "_blank")}
                    className="gap-2 cursor-pointer"
                >
                    <Linkedin className="h-4 w-4" />
                    Share on LinkedIn
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => window.open(shareLinks.facebook, "_blank")}
                    className="gap-2 cursor-pointer"
                >
                    <Facebook className="h-4 w-4" />
                    Share on Facebook
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={copyToClipboard}
                    className="gap-2 cursor-pointer"
                >
                    <LinkIcon className="h-4 w-4" />
                    Copy Link
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default SocialShare;
