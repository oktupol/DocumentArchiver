# DocumentArchiver

This is going to be a command line tool to use for archiving physical documents. Work in progress.

Installation and usage manuals will be added later.

## Principle

Archiving documents is tough. You have to decide for a system once and stick with it for your entire life, because re-organising hundreds of documents years later is a huge hassle. I decided to go for the digital approach. No more physically categorising documents in different physical folders, no more spending hours on neatly browsing through ages old pieces of paper to find a particular document. Everything will be kept digitally, with remarks about the physical location of the original document.

Here is how it works:

- When receiving an important letter or any other document that I need to archive, I scan it with this program.
- First, the program asks me which category this document belongs to. Categories are being represented by sub-directories in the archive.
- Then, the program asks me for a name for this document. Another sub-directory inside the category directory will be created with that name.
- Each page is scanned individually and saved in the sub-directory created for the document. The pages are saved as jpeg-files with numbers as file names, starting at 0001.jpg, then 0002.jpg etc.
- Tesseract, an OCR tool, goes through each page and transscribes them into a text file `summary.txt`. It's not important that the text file is formatted in the same way as the original document. The only thing that matters is that every word, every sentence in the original document has to be present in the text file in one way or another.
- Finally, an incremental serial number is created for the document. The first document starts at 1, the next one is 2, then 3 and so on. This serial number is saved as the name of a file in the document's directory, e.g. The 1731st document receives a file named `1731.docid`. This file will also contain some basic information about the document.
- I write the serial number on the original document with a text marker and put it into a folder, on top of the last document. I do not sort the documents physically.
- Once the folder is full, I write the first and the last serial numbers of the documents inside this folder on its back and start putting new documents in a new, empty folder.

This leaves me with plenty of advantages:

- First of all, I have digital backups of all important documents.
- I never have to take a document out of a folder again if someone wants a digital copy of it, which decreases wear and tear on the documents. If I need to find a scan of a physical document, I can do it in a matter of seconds with `find . -name [serial number].docid`.
- I can use `grep` to search for documents containing certain terms, thanks to the transscripts created by `tesseract`.
- If I need a physical copy, I just need to look at its serial number. Then take out the folder whose serial number range on its back contains this serial number, and look for the document much like looking for a page in a book.

## Requirements

I didn't test this program on any other machine than mine, which runs on Ubuntu. It should work on Linux and Mac machines, but it'll probably not run on Windows.

This program uses the OCR program tesseract. On Ubuntu, install it with `sudo apt install tesseract-ocr`, along with at least one language package such as `tesseract-orc-deu`.

This program uses Sane's scanimage utility. On Ubuntu, install it with `sudo apt install sane`.

## Set Up

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