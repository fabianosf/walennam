import { useState, useEffect } from "react";
import { ExternalLink, Star, Play, Loader2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface AmazonProductProps {
  title: string;
  description: string;
  image: string;
  price: string;
  rating: number;
  affiliateLink: string;
  badge?: string;
  videoUrl?: string;
}

const AmazonProductCard = ({
  title,
  description,
  image,
  price,
  rating,
  affiliateLink,
  badge,
  videoUrl,
}: AmazonProductProps) => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [videoEmbedUrl, setVideoEmbedUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [embedError, setEmbedError] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Função para obter URL do vídeo embed (YouTube, Vimeo, etc.)
  const getVideoEmbedUrl = (url: string): string | null => {
    if (!url) return null;
    
    try {
      // YouTube - com autoplay e outros parâmetros
      if (url.includes("youtube.com/watch") || url.includes("youtu.be/")) {
        let videoId: string | null = null;
        
        if (url.includes("youtu.be/")) {
          videoId = url.split("youtu.be/")[1].split("?")[0].split("/")[0];
        } else if (url.includes("youtube.com/watch")) {
          const urlObj = new URL(url);
          videoId = urlObj.searchParams.get("v");
        }
        
        if (videoId) {
          return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&enablejsapi=1`;
        }
      }
      
      // Se já for uma URL de embed do YouTube, adiciona parâmetros
      if (url.includes("youtube.com/embed/")) {
        const separator = url.includes("?") ? "&" : "?";
        return `${url}${separator}autoplay=1&rel=0&modestbranding=1&enablejsapi=1`;
      }
      
      // Vimeo - com autoplay
      if (url.includes("vimeo.com/")) {
        const videoId = url.split("vimeo.com/")[1].split("?")[0].split("/")[0];
        if (videoId) {
          return `https://player.vimeo.com/video/${videoId}?autoplay=1`;
        }
      }
      
      // Se já for uma URL de embed do Vimeo, adiciona parâmetros
      if (url.includes("player.vimeo.com")) {
        const separator = url.includes("?") ? "&" : "?";
        return `${url}${separator}autoplay=1`;
      }
      
      // URLs do tipo amzn.to ou outras URLs curtas não podem ser embedadas
      // Retorna null para mostrar o fallback
      if (url.includes("amzn.to") || url.includes("amazon.com") || url.includes("amazon.com.br")) {
        return null;
      }
      
      // Para outros casos, assume que é uma URL direta de vídeo
      return url;
    } catch (error) {
      console.error("Erro ao processar URL do vídeo:", error);
      return null;
    }
  };

  // Quando o modal abre, gera a URL do embed
  useEffect(() => {
    if (isVideoOpen && videoUrl) {
      setIsLoading(true);
      setEmbedError(false);
      const embedUrl = getVideoEmbedUrl(videoUrl);
      
      if (embedUrl) {
        setVideoEmbedUrl(embedUrl);
      } else {
        // Se não conseguir gerar embed URL, mostra erro
        setEmbedError(true);
        setIsLoading(false);
      }
    } else {
      setVideoEmbedUrl("");
      setIsLoading(true);
      setEmbedError(false);
    }
  }, [isVideoOpen, videoUrl]);

  return (
    <>
      <Card className="group relative overflow-hidden hover:shadow-xl transition-all duration-300 border-border h-full flex flex-col">
        {badge && (
          <div className="absolute top-2 right-2 z-10">
            <span className="bg-primary text-white text-xs font-semibold px-2 py-1 rounded">
              {badge}
            </span>
          </div>
        )}
        <div className="aspect-square overflow-hidden bg-muted relative">
          {image && !imageError ? (
            <>
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                onError={() => setImageError(true)}
                onLoad={() => setImageError(false)}
              />
              {videoUrl && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsVideoOpen(true);
                  }}
                  className="absolute bottom-3 right-3 z-10 bg-black/70 hover:bg-black/90 text-white rounded-full p-3 transition-all hover:scale-110 shadow-lg"
                  aria-label="Assistir vídeo do produto"
                  title="Assistir vídeo"
                >
                  <Play className="h-5 w-5" fill="white" />
                </button>
              )}
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-muted to-muted/50">
              <span className="text-muted-foreground text-sm">Imagem não disponível</span>
            </div>
          )}
        </div>
      <CardHeader className="flex-grow">
        <CardTitle className="text-lg line-clamp-2">{title}</CardTitle>
        <CardDescription className="text-sm line-clamp-2 mt-2">{description}</CardDescription>
        <div className="flex items-center gap-1 mt-3">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
              }`}
            />
          ))}
          <span className="text-xs text-muted-foreground ml-1">({rating})</span>
        </div>
        <p className="text-xl font-bold text-primary mt-3">{price}</p>
      </CardHeader>
      <CardContent>
        <Button
          className="w-full bg-orange-500 hover:bg-orange-600 text-white"
          asChild
        >
          <a
            href={affiliateLink}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="flex items-center justify-center gap-2"
          >
            Ver na Amazon <ExternalLink className="h-4 w-4" />
          </a>
        </Button>
        <p className="text-xs text-muted-foreground mt-2 text-center">
          *Como afiliado, ganhamos com compras qualificadas
        </p>
      </CardContent>
    </Card>

    {/* Video Dialog */}
    {videoUrl && (
      <Dialog open={isVideoOpen} onOpenChange={setIsVideoOpen}>
        <DialogContent className="max-w-5xl w-[95vw] p-0 gap-0">
          <DialogHeader className="px-6 pt-6 pb-4">
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
          <div className="relative aspect-video w-full bg-black overflow-hidden min-h-[400px]">
            {embedError ? (
              // Fallback: mostra mensagem e botão para abrir vídeo em nova aba
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white p-8">
                <Play className="h-16 w-16 mb-4 text-primary" />
                <p className="text-lg font-semibold mb-2">Link da Amazon</p>
                <p className="text-sm text-gray-400 mb-6 text-center max-w-md">
                  Links da Amazon não podem ser exibidos embutidos. Clique no botão abaixo para abrir a página do produto na Amazon em uma nova aba.
                </p>
                <Button
                  onClick={() => window.open(videoUrl, "_blank")}
                  className="bg-primary hover:bg-primary/90"
                  size="lg"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Ver na Amazon
                </Button>
              </div>
            ) : (
              <>
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black z-10">
                    <Loader2 className="h-12 w-12 text-white animate-spin" />
                  </div>
                )}
                {videoEmbedUrl && (
                  <iframe
                    key={videoEmbedUrl}
                    src={videoEmbedUrl}
                    className="w-full h-full absolute inset-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    title={`Vídeo de ${title}`}
                    onLoad={() => {
                      setIsLoading(false);
                      setEmbedError(false);
                    }}
                    onError={() => {
                      setIsLoading(false);
                      setEmbedError(true);
                    }}
                    style={{ minHeight: "400px", border: "none" }}
                  />
                )}
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    )}
    </>
  );
};

export default AmazonProductCard;

