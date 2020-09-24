# Seis Unix Syntax and Functions

## Understanding SU syntax

Seismic Unix functions operate based on std-in and std-out functionality of the terminal. 

- std-in and std-out stand for standard stream in/out respectively. Any time a command outputs something to the terminal. The output goes to the terminal in the form of std-out. SeisUnix commands take advantage of both std in and stdout.
- `>` - storing std-out to this file and `<` - take std-in from this file.
  - usage: `sugain agc=1 < input.su > output.su`
- `|` - Pipe to next command.
  - usage: `suplane | suximage perc=90` (takes std-out from suplane and directly funnels it into suximage)
- combined usage: `sugain < input.su | sunmo tnmo=0,1,2 vnmo=1000,2000,3000 | susort +cdp +offset > output.su`
  - input gets gained, output from sugain gets some velocities applied to it, velocities get sorted, and an output is produced as an su file.
  - A benefit of doing it this way is that none of the intermediate files are saved to your hard-drive. This is a trade-off if you wanted to see exactly what was going on during those intermediary steps.

## Help and Documentation functions

- `sudoc $COMMANDNAME` - Useful for finding the most descriptive information available about a specific command
- `sufind $COMMANDNAME` - Useful for finding more information about a specific command
- `suhelp` - Generates a list of all available commands based on their functionality



## SU Usage

The following commands are the ones I have personally found useful in the last 3 months I spent learning SU. A quick disclaimer: SU has much more functionality than the handful of commands I mention here. These are just the ones I have used when processing a seismic line.

**See sudoc  for more info** about the commands mentioned below or throughout the guide.

### Converting between SEG-Y and SU

- `segyread tape=$SEGY_FILE verbose=1 endian=0 | segyclean > data.su `
  - takes in an input segy file from the tape parameter. verbose 1 means to display error or other log messages. endian=0 is a pretty important configuration. You can read about in greater detail [here](https://chortle.ccsu.edu/AssemblyTutorial/Chapter-15/ass15_3.html). Most personal computers are Little Endian machines hence endian=0 in our case.
- `segyhdrs`
  - 
- `segywrite`
  - 

### Header Commands

- `surange < data.su`  
  - Used to check all non-zero/non-Null headers in our dataset. Displays the min and max values

- `sushw <indata.su >modified_headers.su key1=$KEY ...`  
  - This a pretty comprehensive program used to manipulate header values in the header.
  - variable a is used to shift the variable up or down by the integer provided in a.
  - variable d is used to refer to the increment between header values.
  - example: if our cdp values start at 20 and go up by 3 and we want them to start at 1 and increment by 1 we would run: `sushw <input.su key=cdp a=-19 d=3 | sushw > output.su key=cdp a=1` .
- `sukeyrange -o > sukeys.txt`  
  - Displays all available header variables and their descriptions. This makes a good outputfile. It is data-agnostic (doesnt need any specific input), specific to headers used by the SU framework.
- `sugethw < input.su > header_values.txt key=tracl,fldr,cdp,ep `
  - outputs the header values for keys selected by the key variable into header_values.txt. This is a useful command for troubleshooting and understanding the order of headers in seismic unix.

### Plotting commands

- `suximage < data.su` 
  -  Display the seismic line from data.su in an x-window raster format.
- `suxwigb < data.su` 
  - Display the seismic line from data.su in an x-window wiggle format.
- `suwind < data.su key=$KEY min=$MIN max=$MAX tmin=$mintime tmax=$maxtime >windowed_data.su` 
  -  Window the seismic line from data.su in so that only the selected portion of $KEY is recorded. Could be cdps (cdp), trace number (tracl) or any other key found from surange.

The next section will contain a shell file with a typical seismic data workflow. going from raw shot gather data in su format and converting it into a stacked line that is cdp sorted, migrated and has some statics applied. We will also talk more about the processing commands used for that workflow in that section.