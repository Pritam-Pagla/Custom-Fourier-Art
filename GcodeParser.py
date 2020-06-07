# This the GCode Coordinate Parser for Fourier Art
# By Pritam Pagla

# Step 1: Copy the Gcode data of your custom drawing in some .txt file                 
# Step 2: Give the path along with the filename only as first input(e.g. for file in D:\gcode.txt you give input as: D:\gcode)
# Step 3: The pathname along with the name only of the output .txt file, where 2d array of coordinates will be stored

# Step 4: Use the output file as .js file as drawing element in html

finput = input("Enter the name of the .txt file you want to parse:  ")
fin_name = finput+'.txt'
with open(fin_name, 'r') as fin:  
    each_line = fin.readlines()

newline = '\n' # stripping away newline character
each_line = [newline.strip() for newline in each_line]  # eliminating the '\n' of each line

needed_list = []

for line in each_line:
    if (line[0:3] == 'G03' or line[0:3] == 'G02'):
        pos_x = line.find('X')  # determining the positions of X, Y and Z characters at each line
        pos_y = line.find('Y')
        pos_z = line.find('Z')
        
        x_val = line[pos_x+1:pos_y]         # X value parsed at that line
        y_val = line[pos_y+1: pos_z]        # Y value parsed at that line
        print("X: "+ x_val+ ", Y: "+ y_val)
        in_str = "{x: "+x_val+", y:"+y_val+"},"  # creating string to write in another file
        needed_list.append(in_str)  # store every string in needed_list list

foutput = input("Enter the name of generating .txt file: ")  
fout_name = foutput+'.txt'     
      
with open(fout_name, 'w') as fout:
    fout.write("let drawing = [")
    fout.write('\n')
    fout.write('\n')
    fout.write('\n')
    for line in needed_list:
        fout.write(line)   # write every element of needed_list in the .txt file on each line
        fout.write('\n')
    fout.write('\n')
    fout.write('\n')
    fout.write(']')
    


