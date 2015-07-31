---
layout: project
permalink: project/clothsim/

display_id: cloth_sim

name: Cloth Simulation with Finite Element Method
short_desc: Final Project for CS184-Computer Graphics at Berkeley
lang: [c++, openmp, opengl]
description: |
    This project along is part of our final project for CS184-Computer Graphics at Berkeley. We implemented a physical based simulator for cloth using finite element methods; we have also serialized the output of our cloth simulator into a <a href="/project/raytracer/">global illumination renderer</a> we created.
---
Demo of simulated cloth
<iframe width="100%" height="400" src="http://www.youtube.com/embed/ZoV2t9AIRNA?vq=hd720&rel=0&theme=light" frameborder="0"></iframe>

For the Mass-Spring Cloth Simulation, we use the following equations to calculate the force vector between two connected masses:
<div>
$$
f_{1} = - \left[ k_{s} ( \left| p_{1}-p_{2} \right| - l_{0} )
		   + k_{d}\frac{ (v_{1}-v_{2}) \cdot (p_{1}-p_{2}) }
			   			{\left|p_{1}-p_{2}\right|}
		  \right] \\
f_{2} = - f_{1}
$$
</div>

Due to the limit of mass-spring systems, there are some obvious artifacts in the simulation - like lack of stretching force and excess of bending force. However, finite element method nicely solved the above problems from a energy condition approaches.

Below are the equations we used for FEM cloth simulation:

**Mesh Deformation Condition**:
<div>
$$
\textbf{C}(\textbf{x}) = a \left(
    \begin{matrix}
      \|\textbf{w}_{u}(\textbf{x})\| - b_{u} \\
      \|\textbf{w}_{v}(\textbf{x})\| - b_{v} \\
    \end{matrix}
\right)
$$
</div>

**Stretching Force**:
<div>
$$
\textbf{f}_{i} = - \frac{\partial \textit{E}_{C}}{\partial \textbf{x}_i} = - k \frac{\partial \textbf{C}(\textbf{x})}{\partial \textbf{x}_i}\textbf{C}(\textbf{x})
$$
</div>

**Stretching Damping Force**:
<div>
$$
\textbf{d} = -k_{d} \frac{\partial \textbf{C}(\textbf{x})}{\partial \textbf{x}} \dot{\textbf{C}}(\textbf{x})
$$
</div>

**Sheering Force**:
<div>
$$
\textit{C}(\textbf{x}) = a\textbf{w}_{u}(\textbf{x})^{\textit{T}}\textbf{w}_{v}(\textbf{x})
$$
</div>

**Bending Force Directions**:
<div>
$$
u_{1} = \left|E\right| \frac{N_{1}}{\left|N_{1}\right|^2} \\
u_{2} = \left|E\right| \frac{N_{2}}{\left|N_{2}\right|^2} \\
u_{3} = \frac{(x_{1} - x_{4}) \cdot E}{\left|E\right|} \frac{N_{1}}{\left|N_{1}\right|^2} + \frac{(x_{2} - x_{4}) \cdot E}{\left|E\right|} \frac{N_{2}}{\left|N_{2}\right|^2} \\
u_{4} = - \frac{(x_{1} - x_{3}) \cdot E}{\left|E\right|} \frac{N_{1}}{\left|N_{1}\right|^2} - \frac{(x_{2} - x_{3}) \cdot E}{\left|E\right|} \frac{N_{2}}{\left|N_{2}\right|^2} \\
$$
</div>

**Bending Force Magnitude**:
<div>
$$
\textit{F}_{i}^{e} = k^{e}  \frac{\left|E\right|^{2}} {\left|N_{1}\right| + \left|N_{2}\right|} \sin(\unicode[Times]{x3B8} / 2) u_{i}
$$
</div>

**Bending Damping Force**:
<div>
$$
\textit{F}_{i}^{d} = -k^{d} \left|E\right| (d\unicode[Times]{x3B8} / dt) u_{i}
$$
</div>

We use [verlet integration](http://en.wikipedia.org/wiki/Verlet_integration) since it works nice with moderate time step, and the calculation in each time step is in acceptable range.

FEM cloth simulation is implemented with [OpenMP](http://openmp.org/wp/) to accelerate the calculation speed in each timestep.

Also, our simulator could output each frame as an image file or an .obj file, and **the obj data file could be serialized into our [global illumination renderer](/project/raytracer/)**.

Here are two videos showing rendered cloth simulation videos.
<iframe width="100%" height="400" src="http://www.youtube.com/embed/vHHDwwqTLlc?vq=hd720&rel=0&theme=light" frameborder="0"></iframe>
*Breeze*

<iframe width="100%" height="400" src="http://www.youtube.com/embed/IsyFa5dMyHM?vq=hd720&rel=0&theme=light" frameborder="0"></iframe>
*Gravity*

**Acknowledgments**:
During the development of this project, we are instructed by Professor [James O'Brien](http://www.cs.berkeley.edu/~job/Prof._James_F._OBrien/Home.html) and our GSI [Jiamin Bai](http://www.eecs.berkeley.edu/~bjiamin/About%20Me.html) and [Brandon Wang](http://brandonwang.net/). We have also gained instructions from Professor [Nancy Pollard](http://graphics.cs.cmu.edu/nsp/index.html)'s [_course assignment_](http://graphics.cs.cmu.edu/nsp/course/15-464/Spring11/afs/asst3%20handout/15464-Assignment3.pdf), Professor [David Baraff](http://www.cs.cmu.edu/~baraff/)'s [_Large steps in cloth simulation_](http://www.cs.cornell.edu/courses/cs667/2005sp/readings/baraff98.pdf), and Professor [Robert Bridson](http://www.cs.ubc.ca/~rbridson/)'s [_Simulation of Clothing with Folds and Wrinkles_](http://www.cs.ubc.ca/~rbridson/docs/cloth2003.pdf).
