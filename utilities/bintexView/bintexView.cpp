#include <iostream>
#include <fstream>
#include <vector>

int main(int argc, char** argv) {
    // check for correct command line arguments

    if (argc < 2) {
        std::cerr << "Usage: bintexView <bintexFilePath>" << std::endl;
        return 1;
    }

    char* bintexFilePath = argv[1];

    // attempt to open BINTEX file

    std::ifstream bintexFileStream(bintexFilePath, std::ios::binary);

    if (!bintexFileStream.is_open()) {
        std::cerr << "Error: unable to open file: " << bintexFilePath << std::endl;
        return 1;
    }

    // copy BINTEX file binary data into vector of char

    bintexFileStream.seekg(0, std::ios::end);
    unsigned int length = bintexFileStream.tellg();
    bintexFileStream.seekg(0, std::ios::beg);

    std::vector<unsigned char> bintexData(length);
    bintexFileStream.read((char*)(&bintexData[0]), length);

    // show some basic information

    unsigned short width = (bintexData[0] << 0) | (bintexData[1] << 8);
    unsigned short height = (bintexData[2] << 0) | (bintexData[3] << 8);
    unsigned short bitDepth = (bintexData[4] << 0) | (bintexData[5] << 8);

    std::cout << width << "x" << height << ", " << bitDepth << "-bit" << std::endl;
    std::cout << "bottom left pixel: " << bintexData[6]+0 << "," << bintexData[7]+0 << "," << bintexData[8]+0 << std::endl;

    return 0;
}
