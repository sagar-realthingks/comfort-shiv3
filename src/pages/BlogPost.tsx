import { useParams, Link, useNavigate } from "react-router-dom";
import { Calendar, Clock, Tag, ArrowLeft, Share2, Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { getPostBySlug, getRelatedPosts } from "@/data/blogData";
import { openWhatsApp } from "@/utils/whatsappHelper";
import { CONTACT_INFO } from "@/config/contact";
import { toast } from "sonner";
import ReactMarkdown from 'react-markdown';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  if (!slug) {
    navigate('/blog');
    return null;
  }

  const post = getPostBySlug(slug);
  
  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4">Article Not Found</h1>
          <p className="text-muted-foreground mb-6">The article you're looking for doesn't exist.</p>
          <Button asChild>
            <Link to="/blog">Back to Blog</Link>
          </Button>
        </div>
      </div>
    );
  }

  const relatedPosts = getRelatedPosts(post.id);

  const handleShare = async () => {
    const url = window.location.href;
    const text = `${post.title} - ${post.excerpt}`;
    
    if (navigator.share) {
      try {
        await navigator.share({ title: post.title, text, url });
      } catch (err) {
        // Fallback to copy
        navigator.clipboard.writeText(url);
        toast.success("Link copied to clipboard!");
      }
    } else {
      navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard!");
    }
  };

  const handleCall = () => {
    window.location.href = `tel:${CONTACT_INFO.phone}`;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="section-padding-sm bg-gradient-hero">
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/blog')}
              className="mb-6 gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Button>

            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              {post.category}
            </Badge>

            <h1 className="mb-4">{post.title}</h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {new Date(post.publishedDate).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </div>
              <div className="flex items-center gap-2">
                <span>By {post.author}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map(tag => (
                <Badge key={tag} variant="outline" className="text-xs">
                  <Tag className="w-3 h-3 mr-1" />
                  {tag}
                </Badge>
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={handleShare}
              className="gap-2"
            >
              <Share2 className="w-4 h-4" />
              Share Article
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="container-narrow">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Card className="bg-background border-0 shadow-md">
                <CardContent className="p-6 md:p-8">
                  <div className="prose prose-slate max-w-none
                    prose-headings:font-bold prose-headings:text-foreground
                    prose-h1:text-3xl prose-h1:mb-4
                    prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
                    prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
                    prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-4
                    prose-strong:text-foreground prose-strong:font-semibold
                    prose-ul:my-4 prose-ul:list-disc prose-ul:pl-6
                    prose-ol:my-4 prose-ol:list-decimal prose-ol:pl-6
                    prose-li:text-muted-foreground prose-li:mb-2
                    prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                    prose-code:text-primary prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded
                    prose-blockquote:border-l-primary prose-blockquote:bg-muted/50 prose-blockquote:pl-4 prose-blockquote:py-2"
                  >
                    <ReactMarkdown>{post.content}</ReactMarkdown>
                  </div>
                </CardContent>
              </Card>

              {/* CTA Card */}
              <Card className="mt-6 bg-gradient-primary text-primary-foreground border-0">
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl font-bold mb-3 text-primary-foreground">
                    Need Professional Help?
                  </h3>
                  <p className="text-primary-foreground/90 mb-4">
                    Our expert technicians are ready to assist you with all AC services
                  </p>
                  <div className="flex flex-wrap gap-3 justify-center">
                    <Button
                      variant="secondary"
                      size="lg"
                      onClick={handleCall}
                      className="gap-2"
                    >
                      <Phone className="w-4 h-4" />
                      Call Now
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => openWhatsApp({
                        type: "general",
                        sourceSection: `Blog - ${post.title}`,
                        customMessage: `Hi! I read your blog article "${post.title}" and would like to know more about your AC services.\n\nName: \nMobile Number: \n\n*Source:* Blog Article`
                      })}
                      className="gap-2 bg-[#25D366] hover:bg-[#20BA5A] text-white border-0"
                    >
                      <MessageCircle className="w-4 h-4" />
                      WhatsApp
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Contact */}
              <Card className="bg-gradient-card border-0 shadow-md sticky top-20">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Quick Contact</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Call us for immediate assistance</p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCall}
                      className="w-full gap-2"
                    >
                      <Phone className="w-4 h-4" />
                      {CONTACT_INFO.phone}
                    </Button>
                  </div>
                  <Separator />
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Message us on WhatsApp</p>
                    <Button
                      size="sm"
                      onClick={() => openWhatsApp({
                        type: "general",
                        sourceSection: `Blog - ${post.title}`,
                        customMessage: `Hi! I read your blog article "${post.title}".\n\nName: \nMobile Number: `
                      })}
                      className="w-full gap-2 bg-[#25D366] hover:bg-[#20BA5A]"
                    >
                      <MessageCircle className="w-4 h-4" />
                      WhatsApp Us
                    </Button>
                  </div>
                  <Separator />
                  <div>
                    <Button asChild variant="default" size="sm" className="w-full">
                      <Link to="/#contact">Book Service Online</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Related Articles */}
              {relatedPosts.length > 0 && (
                <Card className="bg-gradient-card border-0 shadow-md">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Related Articles</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {relatedPosts.map(relatedPost => (
                      <Link
                        key={relatedPost.id}
                        to={`/blog/${relatedPost.slug}`}
                        className="block group"
                      >
                        <div className="space-y-2">
                          <Badge variant="outline" className="text-xs">
                            {relatedPost.category}
                          </Badge>
                          <h4 className="text-sm font-semibold group-hover:text-primary transition-colors line-clamp-2">
                            {relatedPost.title}
                          </h4>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            {relatedPost.readTime}
                          </div>
                        </div>
                        {relatedPost.id !== relatedPosts[relatedPosts.length - 1].id && (
                          <Separator className="mt-4" />
                        )}
                      </Link>
                    ))}
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPost;
