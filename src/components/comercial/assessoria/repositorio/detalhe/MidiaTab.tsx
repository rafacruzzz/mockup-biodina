import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Produto } from "@/types/produto";
import { Image, Video, Upload } from "lucide-react";

interface MidiaTabProps {
  produto: Produto;
}

export function MidiaTab({ produto }: MidiaTabProps) {
  return (
    <div className="space-y-6">
      {/* Galeria de Imagens */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Image className="h-5 w-5" />
              Galeria de Imagens
            </CardTitle>
            <Button>
              <Upload className="h-4 w-4 mr-2" />
              Upload de Imagens
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {produto.galeria && produto.galeria.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {produto.galeria.map((imagem, index) => (
                <img
                  key={index}
                  src={imagem}
                  alt={`${produto.nome} - Imagem ${index + 1}`}
                  className="w-full h-48 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <Image className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Nenhuma imagem disponível</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Vídeos */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Video className="h-5 w-5" />
              Vídeos
            </CardTitle>
            <Button>
              <Upload className="h-4 w-4 mr-2" />
              Upload de Vídeos
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {produto.videos && produto.videos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {produto.videos.map((video, index) => (
                <div key={index} className="aspect-video bg-muted rounded-lg">
                  <video
                    src={video}
                    controls
                    className="w-full h-full rounded-lg"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <Video className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Nenhum vídeo disponível</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
