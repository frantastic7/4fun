import os

#main path

PATH = os.path.join(os.path.expanduser("~"),"Desktop")

#paths for all types of documents and their vaild extentions

PICTURES = os.path.join(PATH, "pictures")
picture_extensions = (".jpg",".jpeg",".png")
VIDEOS = os.path.join(PATH,"videos")
video_extensions = (".mp4",".mv")
DOCUMENTS =os.path.join(PATH,"documents")
document_extensions = (".docx",".docs",".txt",".pptx",".ppt",".pdf")
CODE_FILES = os.path.join(PATH,"code_files")
code_extensions = (".py",".c",".cpp")
WEB_FILES = os.path.join(PATH,"web_files")
web_extensions = (".html",".css",".js",".php")

#checks if the directories exists and if they don't makes them, so you dont have to make them all manually, if you add a new type of direcotry be sure do add it to the list

for dir in [PICTURES, VIDEOS, DOCUMENTS, CODE_FILES, WEB_FILES]:
    if not os.path.exists(dir):
        os.makedirs(dir)

#lists all desktop files and sorts based on extenstions

for file in os.listdir(PATH):
    if os.path.isfile(os.path.join(PATH, file)):
        _, extension = os.path.splitext(file)
        if extension.lower() in picture_extensions:
            source = os.path.join(PATH, file)
            destination = os.path.join(PICTURES, file)
            os.rename(source, destination)
        elif extension.lower() in video_extensions:
            source = os.path.join(PATH, file)
            destination = os.path.join(VIDEOS, file)
            os.rename(source, destination)
        elif extension.lower() in document_extensions:
            source = os.path.join(PATH, file)
            destination = os.path.join(DOCUMENTS, file)
            os.rename(source, destination)
        elif extension.lower() in code_extensions:
            source = os.path.join(PATH, file)
            destination = os.path.join(CODE_FILES, file)
            os.rename(source, destination)
        elif extension.lower() in web_extensions:
            source = os.path.join(PATH, file)
            destination = os.path.join(WEB_FILES, file)
            os.rename(source, destination)