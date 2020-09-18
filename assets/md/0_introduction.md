# Introduction

Seismic Unix is an open-source Linux based framework that provides it's users with seismic data processing (<i>sdp</i>) functionality. Throughout this guide, we will explore <b> how to get started </b> with Seismic Unix.

Seismic surveys are the main method of gathering accurate sub surface information relevant to oil and gas exploration. Most professionally used seismic processing frameworks cost upwards of <b>$50,000 per licence</b>. So, for students Seismic Unix is a great way of learning the fundamentals of <i>sdp</i> without the necessity of investment from an employer or a school in order for you to learn.

Seismic Unix was originally started by [Einar Kjartansson](https://www.researchgate.net/profile/Einar_Kjartansson) in the 1970s. It was then expanded upon by various graduate students, and is maintained by [John Stockwell](https://github.com/JohnWStockwellJr) at the [Center for Wave Phenomena - Colorado School of Mines](https://cwp.mines.edu/) at the time of writing this article. <i>Further details about the history of SU can be found [here](https://wiki.seismic-unix.org/sudoc:history_of_su).</i>

For an official and in-depth source on Seismic Unix. I would suggest the following books published by [cwp](https://cwp.mines.edu):

- Seismic Data Processing with Seismic Un*x, ISBN: 0-931830-48-6
  - This is a step-by-step guide that takes you through many useful examples of shell scripting in SU. It comes with 2 CDs that contain the scripts that are mentioned throughout the book. Majority of the examples in the book use [this dataset](https://wiki.seismic-unix.org/tutorials:data) published by [Oz Yilmaz](https://wiki.seg.org/wiki/%C3%96z_Yilmaz) who wrote [Seismic Data Processing](https://wiki.seg.org/wiki/Seismic_Data_Analysis).
- [The New Seismic Unix User's Manual](http://web.mit.edu/cwpsu_v44r1/sumanual_600dpi_letter.pdf) (2019)
  - This book is less of a step-by-step guide and more of a technical manual that describes what each of the functions do in Seismic Unix. I like to think of it as the combination of <code>suhelp</code>, and <code>sudoc</code> commands to put it into a book-like format. It comes in very handy when you just want to easily search for relevant functions instead of using the command prompt. <i>Dont worry if you dont recognize <code>suhelp</code> or <code>sudoc</code>, we will get to this in <b>#ref.</b></i>



## Why read this guide?

This guide is for people who have no knowledge of Linux, terminals or shell scripting. A lot of the resources I have found on Seismic Unix require some preexisting understanding of these concepts and they don't really give you <b>a functional, surface-level workflow</b> that goes through each step of <i>seismic data processing</i> and spits out a result.

I aim to change this in this guide. You can find the scripts I made [here #REF](scripts) that process [this data #REF](data). Throughout the guide I will be talking about how to modify, understand and execute the scripts.