import FilerobotImageEditor, {
  TABS,
  TOOLS,
} from "react-filerobot-image-editor";
import styled from "styled-components";

interface imageEditorProps {
  isOpen: boolean;
  closeImgEditor: () => void;
  src: string;
  onImageSave: (file: File) => void;
  isProfileImage?: boolean;
}

const StyledContainer = styled.div<{ $isOpen: boolean }>`
  display: ${({ $isOpen }) => ($isOpen ? "flex" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  justify-content: center;
  align-items: center;
`;

function ImageEditor({
  isOpen,
  closeImgEditor,
  src,
  onImageSave,
  isProfileImage,
}: imageEditorProps) {
  const handleSave = async (editedImageObject: { imageBase64?: string }) => {
    if (editedImageObject.imageBase64) {
      const response = await fetch(editedImageObject.imageBase64);
      const blob = await response.blob();

      const file = new File([blob], "edited-image.jpg", {
        type: "image/jpeg",
        lastModified: Date.now(),
      });

      onImageSave(file);
      closeImgEditor();
    } else {
      console.error("Image base64 data is undefined");
    }
  };
  return (
    <StyledContainer $isOpen={isOpen}>
      {isOpen && (
        <div>
          <FilerobotImageEditor
            source={src}
            forceToPngInEllipticalCrop={true}
            onSave={(editedImageObject) => handleSave(editedImageObject)}
            onClose={closeImgEditor}
            annotationsCommon={{
              fill: "#ff0000",
            }}
            Text={{ text: "I Love TelWare" }}
            Rotate={{ angle: 90, componentType: "slider" }}
            Crop={
              isProfileImage
                ? {
                    ratio: 1,
                  }
                : {
                    presetsItems: [
                      {
                        titleKey: "classicTv",
                        descriptionKey: "4:3",
                        ratio: 4 / 3,
                      },
                      {
                        titleKey: "cinemascope",
                        descriptionKey: "21:9",
                        ratio: 21 / 9,
                      },
                    ],
                    presetsFolders: [
                      {
                        titleKey: "socialMedia",
                        groups: [
                          {
                            titleKey: "facebook",
                            items: [
                              {
                                titleKey: "profile",
                                width: 180,
                                height: 180,
                                descriptionKey: "fbProfileSize",
                              },
                              {
                                titleKey: "coverPhoto",
                                width: 820,
                                height: 312,
                                descriptionKey: "fbCoverPhotoSize",
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  }
            }
            theme={{
              palette: {
                warning: "#ff0000c0",
                "warning-active": "#ff0000",
                "warning-hover": "#ff0000",
              },
            }}
            tabsIds={
              isProfileImage
                ? [TABS.ADJUST]
                : [TABS.ADJUST, TABS.ANNOTATE, TABS.FINETUNE, TABS.RESIZE]
            }
            defaultTabId={isProfileImage ? TABS.ADJUST : TABS.ANNOTATE}
            defaultToolId={TOOLS.RESIZE}
            defaultSavedImageQuality={0.95}
            savingPixelRatio={4}
            previewPixelRatio={4}
          />
        </div>
      )}
    </StyledContainer>
  );
}

export default ImageEditor;
