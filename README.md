# DocumentArchiver

This is going to be a command line tool to use for archiving physical documents. Work in progress.

Installation and usage manuals will be added later.

## Requirements

I haven't tested this program on any other machine than mine, which runs Ubuntu. It should work on Linux and Mac machines, but it'll probably not run on Windows.

This program uses the OCR program tesseract. On Ubuntu, install it with `sudo apt install tesseract-ocr`, along with at least one language package such as `tesseract-orc-deu`.

This program uses Sane's scanimage utility. On Ubuntu, install it with `sudo apt install sane`.

## Usage

Before the first use, you have to set few defaults in a file called `.documentarchiverrc` in your home directory. There are following settings:

- archiveDirectory (mandatory): The directory in which your archive should be stored. If it doesn't exist, this program will create it upon first usage.
- paperFormat (optional): The default paper format you scan your documents in. For example 'a4' or 'a5'. Currently, only DIN (international) paper formats from A0 to A8 are supported. If you need American paper formats, you can amend them in the file `src/Constants.ts`. The program will ask about the paper format for each document and, if set, automatically pre-select the configured default paper format so that you only have to confirm it with Enter.
- scannerDeviceName (optional): The scanner device name as determined by `scanimage -L`. If not set, no device name will be passed to `scanimage` and the system default scanner will be used.
- tesseractLang (optional): The language which `tesseract` should use. Use the same format for specifying the language as `tesseract` expects for its `-l` parameter. If none is specified, none will be passed on.

An example `.documentarchiverrc` may look like this:

```
archiveDirectory = /home/oktupol/Documents/Archive
paperFormat = a4
scannerDeviceName = dsseries:usb:0x04F9:0x60E0
tesseractLang = deu
```