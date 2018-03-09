#include <iostream>
#include <fstream>
#include <string>
#include <vector>

class TextureData {
    unsigned short width, height, bitDepth;
    std::vector<unsigned char> binaryData;

    void writeMetadata() {
        this->binaryData[0x0] = (unsigned char)((this->width & 0x00FF) >> 0); // little endian, 2-byte width
        this->binaryData[0x1] = (unsigned char)((this->width & 0xFF00) >> 8);

        this->binaryData[0x2] = (unsigned char)((this->height & 0x00FF) >> 0); // little endian, 2-byte height
        this->binaryData[0x3] = (unsigned char)((this->height & 0xFF00) >> 8);

        this->binaryData[0x4] = (unsigned char)((this->bitDepth & 0x00FF) >> 0); // little endian, 2-byte bit depth
        this->binaryData[0x5] = (unsigned char)((this->bitDepth & 0xFF00) >> 8);
    }

    unsigned long getOffset(unsigned short x, unsigned short y) const {
        return 6 + (this->bitDepth / 8) * (this->width * y + x);
    }

    public:

    TextureData():
        width(0),
        height(0),
        bitDepth(0),
        binaryData(6)
    {
        this->writeMetadata();
    }

    TextureData(unsigned short width, unsigned short height, unsigned short bitDepth):
        width(width),
        height(height),
        bitDepth(bitDepth),
        binaryData(6 + width * height * bitDepth / 8)
    {
        this->writeMetadata();
    }

    void resize(unsigned short width, unsigned short height, unsigned short bitDepth) {
        this->width = width;
        this->height = height;
        this->bitDepth = bitDepth;

        this->binaryData.resize(6 + width * height * bitDepth / 8);
        this->writeMetadata();
    }

    unsigned short getWidth() const {
        return this->width;
    }

    unsigned short getHeight() const {
        return this->height;
    }

    unsigned short getBitDepth() const {
        return this->bitDepth;
    }

    void setPixel(unsigned short x, unsigned short y, unsigned char red, unsigned char green, unsigned char blue, unsigned char alpha = 255) {
        unsigned long offset = this->getOffset(x, y);

        this->binaryData[offset + 0x0] = red;
        this->binaryData[offset + 0x1] = green;
        this->binaryData[offset + 0x2] = blue;

        if (this->bitDepth == 32) this->binaryData[offset + 0x3] = alpha;
    }

    unsigned char getPixelRed(unsigned short x, unsigned short y) const {
        unsigned long offset = this->getOffset(x, y);

        return this->binaryData[offset + 0x0];
    }

    unsigned char getPixelGreen(unsigned short x, unsigned short y) const {
        unsigned long offset = this->getOffset(x, y);

        return this->binaryData[offset + 0x1];
    }

    unsigned char getPixelBlue(unsigned short x, unsigned short y) const {
        unsigned long offset = this->getOffset(x, y);

        return this->binaryData[offset + 0x2];
    }

    unsigned char getPixelAlpha(unsigned short x, unsigned short y) const {
        if (this->bitDepth == 24) return 255;

        unsigned long offset = this->getOffset(x, y);

        return this->binaryData[offset + 0x3];
    }

    const char* getData() const {
        return (const char*)(&(this->binaryData[0]));
    }

    unsigned long getDataLength() const {
        return this->binaryData.size();
    }
};

bool readTextureData(const std::vector<unsigned char>& imageData, TextureData& textureData) {
    // verify no color map in use

    int colorMapType = imageData[0x01] << 0;

    if (colorMapType != 0) {
        std::cerr << "Error: color map support not implemented" << std::endl;
        return false;
    }

    // verify no compression in use

    int imageType = imageData[0x02] << 0;

    if (imageType != 2 && imageType != 3) {
        std::cerr << "Error: no support for image types with compression, color maps, or no data" << std::endl;
        return false;
    }

    // read image metadata

    unsigned int imageIdLength = imageData[0x00] << 0;
    unsigned int colorMapLength = imageData[0x05] << 0 | imageData[0x06] << 8;
    unsigned short imageWidth = imageData[0x0C] << 0 | imageData[0x0D] << 8;
    unsigned short imageHeight = imageData[0x0E] << 0 | imageData[0x0F] << 8;
    unsigned short imageBitDepth = imageData[0x10] << 0;

    // verify bit depth is 24 or 32 (or 8 if grayscale)

    if (imageBitDepth != 24 && imageBitDepth != 32 && (imageBitDepth != 8 || imageType != 3)) {
        std::cerr << "Error: 15-bit or 16-bit images not supported" << std::endl;
        return false;
    }

    // write image data to texture

    textureData.resize(imageWidth, imageHeight, (imageBitDepth == 8) ? 24 : imageBitDepth);

    for (unsigned int imageIndex = 0; imageIndex < (unsigned int)(imageWidth * imageHeight); imageIndex += 1) {
        unsigned int offset = 0x12 + imageIdLength + colorMapLength + imageIndex * imageBitDepth / 8;

        unsigned char blue, green, red, alpha = 255;
        blue = imageData[offset + 0x0];

        if (imageType == 3) {
            green = blue;
            red = blue;
        }
        else {
            green = imageData[offset + 0x1];
            red = imageData[offset + 0x2];
            if (imageBitDepth == 32) alpha = imageData[offset + 0x3];
        }

        unsigned short x = imageIndex % imageWidth;
        unsigned short y = imageIndex / imageWidth;

        textureData.setPixel(x, y, red, green, blue, alpha);
    }

    return true;
}

int main(int argc, char** argv) {
    // check for correct command line arguments

    if (argc < 2) {
        std::cerr << "Usage: tga2bintex <tgaFilePath>" << std::endl;
        return 1;
    }

    char* tgaFilePath = argv[1];
    std::string bintexFilePath = tgaFilePath;
    bintexFilePath += ".bintex";

    // attempt to open TGA file

    std::ifstream tgaFileStream(tgaFilePath, std::ios::binary);

    if (!tgaFileStream.is_open()) {
        std::cerr << "Error: unable to open file: " << tgaFilePath << std::endl;
        return 1;
    }

    // copy TGA file binary data into vector of char

    tgaFileStream.seekg(0, std::ios::end);
    unsigned int length = tgaFileStream.tellg();
    tgaFileStream.seekg(0, std::ios::beg);

    std::vector<unsigned char> tgaData(length);
    tgaFileStream.read((char*)(&tgaData[0]), length);

    // prepare contents for BINTEX format

    TextureData bintexData;
    if (!readTextureData(tgaData, bintexData)) {
        return 1;
    }

    // attempt to open BINTEX file

    std::ofstream bintexFileStream(bintexFilePath.c_str(), std::ios::binary);

    if (!bintexFileStream.is_open()) {
        std::cerr << "Error: unable to open file: " << bintexFilePath << std::endl;
        return 1;
    }

    // copy BINTEX format data into output file
    bintexFileStream.write(bintexData.getData(), bintexData.getDataLength());

    return 0;
}
