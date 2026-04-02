export interface Module {
  name: string;
  topics: string[];
}

export interface Subject {
  id: string;
  name: string;
  topics: string[];
  modules?: Module[];
}

export interface Semester {
  number: number;
  subjects: Subject[];
}

export const bcaSyllabus: Semester[] = [
  {
    number: 1,
    subjects: [
      { 
        id: "s1_csct", 
        name: "Computer Science & Computational Thinking", 
        topics: ["Evolution", "Hardware", "Software", "Computational Thinking", "Flowcharts"],
        modules: [
          {
            name: "Module I: HISTORY AND EVOLUTION",
            topics: [
              "Evolution of Computers - History, Generations",
              "Overview of Computer System - Von Neumann Model",
              "Number Systems (Binary, Hexa, Octal, Decimal)",
              "Number Conversion and Digital Codes (Gray, Excess-3, BCD)",
              "Pioneers and Contributors of Computing Systems",
              "Computing Systems: Past to Present (Single Core, Dual-Core, QPU)"
            ]
          },
          {
            name: "Module II: HARDWARE",
            topics: [
              "Electronic Components (Active & Passive)",
              "Motherboard Components (CPU, Cooling Fan, RAM, ROM)",
              "BIOS/UEFI Chip, SATA/NVMe Slots",
              "Computer Components (SMPS, Motherboard, Storage Devices)",
              "Input/Output Ports, Chipset Concepts",
              "Cache Memory Concepts"
            ]
          },
          {
            name: "Module III: SOFTWARE",
            topics: [
              "Application Software vs System Software",
              "Operating System: Need, Types, Proprietary & Open Source",
              "Software Compatibility, POST, Booting",
              "OS Installation: Bootable Media, Partitioning",
              "Boot Manager (BOOTMGR, Grub, LILO)",
              "Device Drivers & Basic Interactions"
            ]
          },
          {
            name: "Module IV: COMPUTATIONAL THINKING",
            topics: [
              "Role of Computer System in Modern Era",
              "Problem Solving: Defining the Problem, Systematic Approach",
              "Computational Thinking: Decomposition, Pattern ID, Abstraction",
              "Logical Thinking: Inductive and Deductive Reasoning",
              "Algorithmic Thinking: Intuition vs Precision",
              "Flowchart Symbols, Examples, Raptor Tool"
            ]
          },
          {
            name: "Module V: OPEN ENDED (LAB)",
            topics: [
              "Identify specifications of electronic components",
              "Identify motherboard components and ports",
              "Installation of various components on motherboard",
              "Assembling and disassembling a computer system",
              "Accessing and configuring BIOS/UEFI settings",
              "Preparation of Bootable media (Rufus)"
            ]
          }
        ]
      },
      { 
        id: "s1_ml", 
        name: "Mathematical Logic", 
        topics: ["Propositional Logic", "Set Theory", "Graph Theory", "Trees"],
        modules: [
          {
            name: "Module I: MATHEMATICAL LOGIC",
            topics: [
              "Propositional Logic: Definition, Logical Operators",
              "Negation, Disjunction, Conjunction, Implication",
              "Truth Table Construction",
              "Law of Logic: Tautology, Contradiction, Contingency",
              "Logical Equivalence & Algebra of Propositions",
              "Validity of Arguments, Quantifiers"
            ]
          },
          {
            name: "Module II: SET THEORY AND RELATIONS",
            topics: [
              "Set Theory: Definition, Concept, Cardinality",
              "Types of Sets, Subsets, Power set, Venn Diagrams",
              "Set operations, Partition",
              "Relation: Definition, Types, Equivalence Class",
              "Di-Graph and related problems",
              "Functions: Intro, Types, Composition, One-to-one, Onto"
            ]
          },
          {
            name: "Module III: INTRODUCTION TO GRAPHS",
            topics: [
              "Graph: Definition, Properties, Simple/Regular Graphs",
              "Null Graph, Subgraph and Isomorphism",
              "Walk, Path, Trail, Circuit, Cycle, Complete Graph",
              "Hand-Shaking Theorem",
              "Euler Graph, Hamiltonian Graph, Homeomorphism",
              "Planar Graph, Kuratowski's two graph",
              "Graph colouring, Chromatic number"
            ]
          },
          {
            name: "Module IV: TREES AND APPLICATIONS",
            topics: [
              "Trees: Definition, Properties, Distance, Eccentricity",
              "Pendant vertex, Center of Tree",
              "Rooted Trees, Binary Trees and Its Properties",
              "Minimum Spanning Tree: Prim's & Kruskal's Algorithm",
              "Cut-Set and Cut-Vertices, Connectivity"
            ]
          }
        ]
      },
      { 
        id: "s1_md", 
        name: "Matrices and Determinants", 
        topics: ["Matrices", "Linear Algebra", "Differentiation", "Integration"],
        modules: [
          {
            name: "Module I: MATRICES AND DETERMINANTS",
            topics: [
              "Matrices: Definition, Order, Types",
              "Operations: Addition, Subtraction, Multiplication",
              "Properties: Transpose, Elementary Transformations",
              "Rank of Matrices, Symmetric & Skew Symmetric",
              "Determinants, Minors, Cofactors, Inverse of a matrix"
            ]
          },
          {
            name: "Module II: LINEAR ALGEBRA",
            topics: [
              "Linear Independence: Characteristic equations",
              "Eigen values, Eigen Vector",
              "Solving system of linear equations: Gauss Elimination",
              "Vectors: Magnitude, Types, Vector addition",
              "Dot products and Cross products",
              "Vectors in 2- and 3-space"
            ]
          },
          {
            name: "Module III: DIFFERENTIATION",
            topics: [
              "Limits: Definition (concept only), Derivative at Function",
              "Differentiation: Definition, First principle",
              "Product rule, Quotient rule, Logarithmic differentiation",
              "Derivative of function of a function"
            ]
          },
          {
            name: "Module IV: INTEGRATION",
            topics: [
              "Integration as Anti-derivative, Indefinite integral",
              "Fundamental theorems, Elementary Standard results",
              "Integration by Substitution, Definite Integrals",
              "Evaluation of Definite Integrals"
            ]
          },
          {
            name: "Module V: APPLICATION LEVEL",
            topics: [
              "Differential Equation: First & Second Order ODEs",
              "Applications: Logarithm, Combinatorics",
              "Matrices in Computer Graphics & Cryptography",
              "Vectors in GPS technology",
              "3D vectors in Virtual Reality"
            ]
          }
        ]
      },
      { id: "s1_ec", name: "English Communication", topics: ["Grammar", "Vocabulary", "Reading Skills", "Writing Skills", "Professional Communication"] },
    ],
  },
  {
    number: 2,
    subjects: [
      { 
        id: "s2_c", 
        name: "C Programming", 
        topics: ["Basics", "Loops", "Arrays", "Functions", "Pointers", "Structures"],
        modules: [
          {
            name: "Module I: INTRODUCTION TO C LANGUAGE",
            topics: [
              "History of C, Importance of C, Simple C programs",
              "Character set, Tokens, Constants, Variables, Data types",
              "Operators: Arithmetic, Relational, Logical, Assignment, Bitwise",
              "Managing Input and Output Operators: Reading/Writing characters"
            ]
          },
          {
            name: "Module II: DECISION MAKING & LOOPING",
            topics: [
              "Decision making with If (Simple, If-else, Nested, Ladder)",
              "Switch statement, Conditional operator, Goto statement",
              "Loops: while, do-while, for statements and nested loops",
              "Jumps in loops - break, continue"
            ]
          },
          {
            name: "Module III: ARRAYS AND FUNCTIONS",
            topics: [
              "One-dimensional, Two-dimensional & Multi-dimensional arrays",
              "Strings - Reading, Writing, Arithmetic operations",
              "User defined functions - Need, Elements, Return types",
              "Parameter passing: Call by value and call by reference",
              "Recursion and command line arguments"
            ]
          },
          {
            name: "Module IV: STORAGE, STRUCTURES & POINTERS",
            topics: [
              "Storage classes - auto, extern, static, register",
              "Structure and Union - Defining, initialization, comparison",
              "Pointers definition, declaring and initializing pointers",
              "Pointers and arrays, pointers and functions",
              "Dynamic memory allocation (malloc, calloc, realloc, free)"
            ]
          },
          {
            name: "Module V: HANDS-ON PROBLEM SOLVING",
            topics: [
              "Implementation of Variables, Data types, Constants",
              "Evaluation of expressions and Temperature conversion",
              "Program to calculate days/months/years",
              "Salesman salary calculation (Salary + Bonus + Commission)",
              "Case Study: Real-world problem solving with modular C"
            ]
          }
        ]
      },
      { 
        id: "s2_stats", 
        name: "Descriptive Statistics & Probability", 
        topics: ["Statistics", "Inference", "Probability", "Distributions"],
        modules: [
          {
            name: "Module I: DESCRIPTIVE STATISTICS",
            topics: [
              "Primary and secondary data collection methods",
              "Measures of central tendencies (Mean, Median, Mode, HM, GM)",
              "Measures of dispersion: Relative and Absolute Measures",
              "Range, Quartile deviation, Mean deviation, Variance"
            ]
          },
          {
            name: "Module II: INFERENCE & REGRESSION",
            topics: [
              "Principles of Least Squares and Fitting of Straight Line",
              "Point estimation: Maximum Likelihood Estimation (MLE)",
              "Pearson's Coefficient of Correlation and Rank Correlation",
              "Simple linear regression and multiple linear regression"
            ]
          },
          {
            name: "Module III: PROBABILITY THEORY",
            topics: [
              "Random experiment, Sample point, Sample Space",
              "Events: Union, Intersection, Complement",
              "Theorems of probability - Addition, Multiplication",
              "Conditional probability and Baye's Theorem",
              "Inverse probability applications"
            ]
          },
          {
            name: "Module IV: ADVANCED PROBABILITY",
            topics: [
              "Discrete and continuous random variables",
              "Binomial, Poisson, and Normal distributions",
              "Standard normal curve and Moment Generating Functions",
              "Testing of Hypothesis: Errors, T-Test, ANOVA, Chi-square"
            ]
          },
          {
            name: "Module V: APPLICATION LEVEL",
            topics: [
              "Reliability and Validity of Different Data Sources",
              "Real-world scenarios for Mean, Median, and Mode",
              "Statistical analysis of production data",
              "Healthcare and Finance data modelling"
            ]
          }
        ]
      },
      { 
        id: "s2_naor", 
        name: "Numerical Analysis & OR", 
        topics: ["Numerical Methods", "Interpolation", "Operations Research", "Optimization"],
        modules: [
          {
            name: "Module I: NUMERICAL ANALYSIS I",
            topics: [
              "Sources of errors in numerical calculations",
              "Algebraic and Transcendental Equations - Bisection method",
              "Method of false position (Regula-Falsi)",
              "Newton Raphson method: Implementation and Convergence"
            ]
          },
          {
            name: "Module II: NUMERICAL ANALYSIS II",
            topics: [
              "Polynomial Interpolation - Lagrange interpolation",
              "Newton's forward and backward difference interpolation",
              "Numerical Solution of Definite Integral - Simpson's 1/3 rule",
              "Simpson's 3/8 Rule and Trapezoidal method"
            ]
          },
          {
            name: "Module III: OPERATIONS RESEARCH I",
            topics: [
              "Introduction to OR - Definition, Advantages, Limitations",
              "Linear Programming Problem (LPP) Formulation",
              "Primal and Dual of LPP",
              "Graphical solution of LPP",
              "Simplex Method & Big-M method"
            ]
          },
          {
            name: "Module IV: OPERATIONS RESEARCH II",
            topics: [
              "Transportation Problem: Northwest, Least cost, Vogel's",
              "Balanced vs Unbalanced Transportation Problems",
              "Optimized (MODI) method for Transportation",
              "Assignment model: Hungarian method for optimal solution"
            ]
          },
          {
            name: "Module V: OPEN ENDED MODULE",
            topics: [
              "Solve Algebraic and Transcendental Equations (Lab)",
              "Polynomial Interpolation methods practice",
              "Definite Integral numerical solutions",
              "Implementing LPP solvers using numerical tools"
            ]
          }
        ]
      },
      { id: "s2_ob", name: "Organizational Behavior", topics: ["Individual Behavior", "Group Dynamics", "Motivation", "Leadership", "Organization Culture"] },
    ],
  },
  {
    number: 3,
    subjects: [
      { 
        id: "s3_dsa", 
        name: "Data Structures & Algorithms", 
        topics: ["Arrays", "Stacks & Queues", "Trees", "Graphs", "Sorting & Searching"],
        modules: [
          {
            name: "Module I: INTRO TO DS AND BASIC ALGORITHMS",
            topics: [
              "Overview of Data Structures, ADT, Linear/Non-Linear classification",
              "Introduction to Arrays (1D, 2D, Multi-Dimensional, Sparse matrix)",
              "Array Operations: Insertion, Deletion, Traversal with Algorithm",
              "Structures and Self-referential structures",
              "Linked list: Single, Double, Circular (Basic operations)"
            ]
          },
          {
            name: "Module II: STACK AND QUEUE",
            topics: [
              "Stack: Definition, Operations, Applications (Recursion, Infix to Postfix)",
              "Implementation of Stack: Using Array and LinkedList",
              "Queue: Definition, Operations, Types (Double ended, Circular)",
              "Implementation of Queue: Using Array and LinkedList"
            ]
          },
          {
            name: "Module III: NON-LINEAR DATA STRUCTURES",
            topics: [
              "Trees: Terminology, Types (Binary, Complete, Full, Skewed)",
              "Binary Tree Representations (Array and Linked list)",
              "Binary Tree Operations: Insertion, Deletion, Traversal (In/Pre/Post)",
              "Non-recursive Binary tree traversal algorithm",
              "Graph: Directed, Undirected, Weighted",
              "Graph representation: Adjacency list and Adjacency Matrix"
            ]
          },
          {
            name: "Module IV: SORTING AND SEARCHING",
            topics: [
              "Sorting: Selection sort, Bubble sort, Exchange sort",
              "Advanced Sorting: Quick sort, Merge sort",
              "Searching: Linear search and Binary search",
              "Hashing: Hash Tables, Functions, Collision resolution"
            ]
          },
          {
            name: "Module V: HANDS-ON PROGRAMMING (LAB)",
            topics: [
              "Implement Basic Operations in a single linked list",
              "Sorting elements in a given singly linked list",
              "Stack & Queue using Arrays and LinkedLists",
              "Implementation of Sorting & Searching Algorithms"
            ]
          }
        ]
      },
      { 
        id: "s3_cn", 
        name: "Computer Networks", 
        topics: ["OSI Model", "Data Link", "Network Layer", "Transport", "Application Layer"],
        modules: [
          {
            name: "Module I: NETWORK MODELS & PHYSICAL LAYER",
            topics: [
              "Types: LAN, MAN, WAN, Internet, Intranet",
              "Network Topologies: Layered approach (OSI vs TCP/IP)",
              "Physical Layer: Analog/Digital signal, Transmission media",
              "Multiplexing: Frequency, Time, and Wavelength division"
            ]
          },
          {
            name: "Module II: DATA LINK LAYER",
            topics: [
              "Services: Error detection/correction (VRC, LRC, CRC, Hamming)",
              "Protocols: Stop and wait, Go back n, Selective repeat",
              "Multiple Access: TDMA, FDMA, CDMA, CSMA/CD, CSMA/CA",
              "Addressing: MAC addressing, Ethernet, Polling, IEEE Standards"
            ]
          },
          {
            name: "Module III: NETWORK LAYER",
            topics: [
              "Networking devices: Repeaters, Bridges, Routers, Firewalls",
              "Logical addressing: IPv4 (NAT) and IPv6 architecture",
              "Address Mapping: Error reporting and multicasting",
              "Routing: Distance Vector Routing, Dijkstra's algorithm"
            ]
          },
          {
            name: "Module IV: TRANSPORT & APPLICATION LAYER",
            topics: [
              "Process-to-process Delivery: UDP and TCP protocols",
              "Congestion control and Quality of Service",
              "Network Services: DNS, Remote Login, Email, FTP",
              "Application Protocols: WWW, HTTP, SNMP, SMTP"
            ]
          },
          {
            name: "Module V: HANDS-ON COMPUTER NETWORKS (LAB)",
            topics: [
              "Identifying Networking Hardware components",
              "IP address configuration, Crimping, Web host setting",
              "Configuring WLAN with more than two systems",
              "Implementing FTP, SMTP, POP, and NFS protocols"
            ]
          }
        ]
      },
      { 
        id: "s3_ds", 
        name: "Introduction to Data Science", 
        topics: ["Pre-Processing", "Analytics", "Model Development", "Evaluation"],
        modules: [
          {
            name: "Module I: INTRODUCTION TO DATA SCIENCE",
            topics: [
              "Definition, Evolution of Data Science",
              "Data Science Roles and Responsibilities",
              "Practical applications of data sciences"
            ]
          },
          {
            name: "Module II: DATA COLLECTION & PRE-PROCESSING",
            topics: [
              "Data Collection Strategies and Challenges",
              "Data Cleaning, Integration, and Transformation",
              "Data Reduction and Descretization techniques"
            ]
          },
          {
            name: "Module III: DATA ANALYTICS",
            topics: [
              "Descriptive Statistics: Mean, Standard Deviation",
              "Skewness and Kurtosis analysis",
              "Visualization: Box Plots, Pivot Tables, Correlation"
            ]
          },
          {
            name: "Module IV: MODEL DEVELOPMENT",
            topics: [
              "Regression analysis: Simple and Multiple Regression",
              "Model Evaluation using Visualization (Residual plots)",
              "Prediction and Decision Making techniques",
              "Supervised vs Unsupervised learning techniques"
            ]
          },
          {
            name: "Module V: MODEL CONCEPTS (LAB)",
            topics: [
              "Out of samples evaluation metrics",
              "Cross validation and Model selection",
              "Overfitting and Underfitting concepts",
              "Ridge regression practical implementation"
            ]
          }
        ]
      },
      { 
        id: "s3_ai", 
        name: "Artificial Intelligence", 
        topics: ["Agents", "Problem Solving", "Logic", "KR", "Ethics"],
        modules: [
          {
            name: "Module I: INTRODUCTION TO AI",
            topics: [
              "Definition, Applications, and Foundations of AI",
              "Intelligent Agents: Agents, Environments, and Rationality",
              "Structure of Agents: Reflex, Model, Goal, Utility based"
            ]
          },
          {
            name: "Module II: AI PROBLEM SOLVING",
            topics: [
              "Problem Solving Agents: Toy vs Real world problems",
              "Search: Uninformed (BFS, DFS) vs Informed (Greedy, A*)",
              "Constraint Satisfaction Problems (CSP): Map colouring",
              "Constraint Propagation: Node, Arc, Path Consistency"
            ]
          },
          {
            name: "Module III: KNOWLEDGE REPRESENTATION",
            topics: [
              "Logical agents: Propositional logic, Syntax, Semantics",
              "First Order Logic (FOL): Models, Symbols, Quantifiers",
              "Ontological Engineering: Categories and Objects",
              "Quantifying Uncertainty and Decision making"
            ]
          },
          {
            name: "Module IV: FOUNDATIONS AND FUTURE",
            topics: [
              "Weak AI vs Strong AI: Philosophical debate",
              "Ethics and risks of artificial intelligence",
              "Agent components and future architectures"
            ]
          },
          {
            name: "Module V: OPEN-ENDED MODULE (LAB)",
            topics: [
              "Analysis of agent types and environments",
              "Building a simple Reflex Agent",
              "Identifying Problem-Solving agents in daily life",
              "Implementing basic search and heuristic algorithms"
            ]
          }
        ]
      },
    ],
  },
  {
    number: 4,
    subjects: [
      { 
        id: "s4_dbms", 
        name: "Database Management System", 
        topics: ["ER Model", "SQL", "Normalization", "Transactions", "NoSQL"],
        modules: [
          {
            name: "Module I: DATABASE SYSTEM - CONCEPT",
            topics: [
              "Introduction and Characteristics of the Database Approach",
              "Actors on the Scene, Workers behind the Scene, Advantages",
              "Data Models, Schemas, Instances, Three-Schema Architecture",
              "Database Languages, Interfaces, Data Independence",
              "Structured, Semi-structured and Unstructured Databases"
            ]
          },
          {
            name: "Module II: DATABASE DESIGN",
            topics: [
              "ER Model: Concepts, entities, attributes, notations",
              "Relationships, constraints, cardinality, participation, weak entities",
              "Relational Model: Domains, attributes, tuples, and relations",
              "Design: Atomic domains and Normalization (1NF, 2NF, 3NF, BCNF)"
            ]
          },
          {
            name: "Module III: QUERY LANGUAGES",
            topics: [
              "Introduction to SQL: Data Definition Language (DDL)",
              "Table definitions and operations, SQL DML queries",
              "Nested queries, Aggregation, Grouping, Views, Triggers",
              "Introduction to NoSQL: Key-value (Redis) and Document (MongoDB)"
            ]
          },
          {
            name: "Module IV: TRANSACTION & CONCURRENCY",
            topics: [
              "Transaction Processing: Introduction and System Concepts",
              "Properties of Transactions, Schedules (Recoverability, Serializability)",
              "Transaction Support in SQL and Concurrency Control (2PL)"
            ]
          },
          {
            name: "Module V: DBMS LAB (HANDS-ON)",
            topics: [
              "ER Diagram Design and Relationship Mapping",
              "Implementing SQL Queries (DDL, DML, DCL)",
              "Developing Nested queries and Database Views",
              "Configuring and executing NoSQL Commands in MongoDB"
            ]
          }
        ]
      },
      {
        id: "s4_se",
        name: "Software Engineering",
        topics: ["SDLC", "Agile", "Requirement Engineering", "System Modelling", "Testing"],
        modules: [
          {
            name: "Module I: THE SOFTWARE PROCESS",
            topics: [
              "Nature of Software, Software Process, SDLC",
              "Prescriptive Process Models: Waterfall, Incremental, Evolutionary",
              "Agile Process: Agility, XP (Values, Process, Debate)",
              "Other Agile Models: Adaptive, Scrum, Dynamic, Crystal"
            ]
          },
          {
            name: "Module II: REQUIREMENT ENGINEERING",
            topics: [
              "Intro to Requirement Engineering: Functional vs Non-functional",
              "Engineering Process: Elicitation, Technique, Stories, Scenarios",
              "Requirement Specification: Natural Language, User Cases",
              "Requirement Validation: Change Management"
            ]
          },
          {
            name: "Module III: SYSTEM MODELLING & ARCHITECTURE",
            topics: [
              "Context models, Interaction models (Use case, Sequence)",
              "Structural Models: Class Diagram, Generalization, Aggregation",
              "Architectural Design: Views, Layered, Repository, Client-Server",
              "Patterns: Transaction Processing, Language Processing"
            ]
          },
          {
            name: "Module IV: TESTING & MAINTENANCE",
            topics: [
              "Testing: Strategic Approach, Verification vs Validation",
              "Techniques: White Box, Black Box, Unit, Integration",
              "Software Maintenance: Supportability, Reengineering",
              "Business Process Reengineering (BPR) and Reverse Engineering"
            ]
          },
          {
            name: "Module V: TRENDS IN SOFTWARE ENGINEERING",
            topics: [
              "Case Study: Applying SE principles to real-world projects",
              "Knowledge Integration from various SE areas",
              "Software Startup Process and Critical Thinking Skills",
              "Applying SE skills to software design and implementation"
            ]
          }
        ]
      },
      {
        id: "s4_ar",
        name: "Automation and Robotics",
        topics: ["Automation Systems", "Control Systems", "Industrial Robotics", "PLC", "Future of Robotics"],
        modules: [
          {
            name: "Module I: INTRODUCTION TO AUTOMATION",
            topics: [
              "Production systems: Facilities, Manufacturing support",
              "Automation in production: Automated systems, Computerized support",
              "Manual labour in production and Levels of automation",
              "Automation functions: Safety monitoring, Maintenance, Repair"
            ]
          },
          {
            name: "Module II: CONTROL SYSTEMS",
            topics: [
              "Process industries vs Discrete manufacturing",
              "Control: Continuous vs Discrete, Computer process control",
              "Logic Control: Programmable Logic Controllers (PLC)",
              "Hardware: Sensors, Actuators, Digital-to-Analog converters"
            ]
          },
          {
            name: "Module III: INDUSTRIAL ROBOTICS",
            topics: [
              "Robot anatomy: Joints, Links, Common configurations",
              "Robot drive systems and Sensors in robotics",
              "Robot Control: Sequence, Playback, Intelligent control",
              "Robot Programming: Lead through, Motion programming"
            ]
          },
          {
            name: "Module IV: THE PRESENT AND FUTURE",
            topics: [
              "Machine Intelligence, Computer and Robotics convergence",
              "Flexible automation vs Robotics technology",
              "Artificial Intelligence and Automated Manufacturing",
              "Future of Robotics and Robotics in India"
            ]
          },
          {
            name: "Module V: APPLICATION LEVEL (LAB)",
            topics: [
              "Role of manual labour in modern manufacturing",
              "Interaction between AI and Robotics systems",
              "Types of error detection and recovery in automation",
              "Discussing and presenting action-oriented robotic solutions"
            ]
          }
        ]
      },
      { 
        id: "s4_python", 
        name: "Python Programming", 
        topics: ["Control Flow", "Functions", "NumPy", "Pandas", "Matplotlib"],
        modules: [
          {
            name: "Module I: INTRO & CONTROL FLOW",
            topics: [
              "Tokens, Operators Precedence, Type Conversion, Built-in functions",
              "Decision-making: if, if-else, elif statements",
              "Looping structures: for, while, range(), break/continue"
            ]
          },
          {
            name: "Module II: FUNCTIONS & MODULES",
            topics: [
              "Function definition, calling, scope, and lifetime of variables",
              "Types of arguments, Recursive, and Anonymous functions",
              "User-defined Modules and Packages implementation"
            ]
          },
          {
            name: "Module III: STRINGS & DATA STRUCTURES",
            topics: [
              "Strings: Traversal, Slicing, Splitting, and Joining",
              "Lists: Indexing, looping, adding/modifying items, slicing",
              "Tuples: Indexing, looping, slicing, and adding items",
              "Dictionaries: Adding/updating/deleting values and traversal"
            ]
          },
          {
            name: "Module IV: SCIENTIFIC COMPUTING",
            topics: [
              "NumPy: 1D, 2D, 3D Arrays, Arithmetic, Universal Functions",
              "Advanced NumPy: Broadcasting and Fancy Logic",
              "Pandas: DataFrames, Series, Index objects, Set operations",
              "Matplotlib: Line, Scatter, Histogram, and Contour plots"
            ]
          },
          {
            name: "Module V: HANDS-ON PROGRAMMING (LAB)",
            topics: [
              "Case Study: In-depth analysis of a real-world dataset",
              "Capstone Project: Build a practical application using Python packages",
              "Implementing advanced data visualization tools",
              "Final project presentation and documentation"
            ]
          }
        ]
      },
    ],
  },
  {
    number: 5,
    subjects: [
      { 
        id: "s5_java", 
        name: "Java Programming", 
        topics: ["OOPs", "Exception Handling", "Multithreading", "JDBC", "GUI Swing"],
        modules: [
          {
            name: "Module I: REVIEW OF OOPS & INTRO TO JAVA",
            topics: [
              "Overview of OOPs Concept, History of Java and JVM",
              "Basic Structure: Data Types, Operators, Control Statements",
              "Arrays and Strings: 1D, Multi-dimensional, String operations",
              "Classes & Objects: Access Modifiers, Constructors, Inheritance",
              "Method Overriding, Overloading, Dynamic Method Dispatch",
              "Interface, Abstract Class and Packages implementation"
            ]
          },
          {
            name: "Module II: EXCEPTION AND I/O OPERATIONS",
            topics: [
              "Exception Hierarchy: try-catch-finally, throw, throws",
              "Managing Input/Output files: Importance of I/O Streams",
              "File Operations: FileInputStream, FileOutputStream, FileReader",
              "Buffered Streams and File Management in Java"
            ]
          },
          {
            name: "Module III: MULTITHREADING & CONNECTIVITY",
            topics: [
              "Thread: Concept, Thread state, and Thread Priorities",
              "Implementation: Thread class and Runnable interface",
              "Database Programming: JDBC Driver, Connecting with Database",
              "Querying Database: PreparedStatement, ResultSet, Metadata"
            ]
          },
          {
            name: "Module IV: GUI PROGRAMMING",
            topics: [
              "Introduction to GUI: AWT Basics and IDE Setup",
              "Swing Programming: Model-View-Controller (MVC) Pattern",
              "Layout Management: SWING fundamental controls",
              "Event Handling: Event Class and Event Listener mechanism"
            ]
          },
          {
            name: "Module V: HANDS-ON PROGRAMMING (LAB)",
            topics: [
              "String operations (charAt, substring, concat, equals)",
              "OOP Concepts: Complex number addition via Classes",
              "Multi-thread implementation for Odd/Even numbers",
              "GUI Application development with Database connectivity"
            ]
          }
        ]
      },
      { 
        id: "s5_web", 
        name: "Web Programming (PHP & MySQL)", 
        topics: ["HTML5", "JavaScript", "PHP", "MySQL", "AJAX", "Laravel"],
        modules: [
          {
            name: "Module I: INTRODUCTION TO WEB DOCUMENT",
            topics: [
              "Web Programming basics: Client and Server-Side Scripting",
              "HTML5: Elements, Attributes, Lists, Tables, Web Workers",
              "CSS3: Syntax, Selectors, Layouts, Gradients, Fonts",
              "Responsive Design with CSS3 Media Queries"
            ]
          },
          {
            name: "Module II: EXPLORING SCRIPTING LANGUAGES",
            topics: [
              "JavaScript: Fundamentals, Variables, Functions, Objects",
              "Events: onLoad, onClick, onSubmit, onChange",
              "jQuery: Selectors, Methods, Events, Effects, AJAX basics"
            ]
          },
          {
            name: "Module III: INTRODUCTION TO PHP",
            topics: [
              "PHP History, Syntax, Variables, Data Types, Constants",
              "Control Structures: Loops, Arrays, Scope of variables",
              "User Defined Functions and Function Scope",
              "Form Interaction: GET/POST, Cookies, Session Management"
            ]
          },
          {
            name: "Module IV: DATABASE PROGRAMMING & PHP",
            topics: [
              "Basic SQL: CREATE, INSERT, SELECT, UPDATE, DELETE",
              "PHP MySQL Functions: connect, query, fetch_row, result",
              "AJAX implementation in PHP for partial page updates",
              "Introduction to Laravel: MVC Architecture and Installation"
            ]
          },
          {
            name: "Module V: OPEN ENDED MODULE (LAB)",
            topics: [
              "Create a simple dynamic website using PHP & MySQL",
              "Implementing user authentication with Sessions",
              "Building interactive forms with JavaScript validation",
              "Using AJAX to fetch live data from a database"
            ]
          }
        ]
      },
      { 
        id: "s5_co", 
        name: "Computer Organization & Architecture", 
        topics: ["Boolean Algebra", "Logic Circuits", "Instruction Cycle", "Memory"],
        modules: [
          {
            name: "Module I: NUMBER SYSTEMS & BOOLEAN ALGEBRA",
            topics: [
              "Binary Arithmetic: 1's and 2's complement addition",
              "Logic Gates: AND, OR, NOT, NAND, NOR, XOR, XNOR",
              "Boolean Algebra: Laws, Rules, DeMorgan's Theorem",
              "Simplification using K-Map up to 4 variables"
            ]
          },
          {
            name: "Module II: LOGIC CIRCUITS",
            topics: [
              "Combinational: Adders (Half, Full, Ripple), Mux/Demux",
              "Latches and Flipflops: SR, D, JK, T types",
              "Sequential: Synchronous/Asynchronous Counters, Registers",
              "Johnson and Ring counter, Shift Registers"
            ]
          },
          {
            name: "Module III: COMPUTER ORGANIZATION",
            topics: [
              "Instruction codes, Registers, and Common Bus system",
              "Computer Instructions, Timing, and Control unit",
              "Instruction Cycle and Microprogrammed Control concepts"
            ]
          },
          {
            name: "Module IV: PROCESSOR, MEMORY & I/O",
            topics: [
              "Processor: General Register organization, Stack, Addressing",
              "Architecture: RISC vs CISC, Pipelining, Parallel Processing",
              "Memory: Hierarchy, Main Memory, Cache Mapping (Direct, Assoc)",
              "I/O Organization: Programmed IO, Interrupts, DMA"
            ]
          },
          {
            name: "Module V: OPEN ENDED MODULE (LAB)",
            topics: [
              "Computer Arithmetic: Multiplication/Division algorithms",
              "Data Transfer and Data Manipulation instructions",
              "Subroutine Call and Return implementation",
              "Simulating basic Instruction Cycle steps"
            ]
          }
        ]
      },
      { id: "s5_dwm", name: "Data Warehousing & Mining", topics: ["OLAP", "Data Cleaning", "Association Rules", "Classification", "Clustering"] },
      { id: "s5_pm", name: "Project Management", topics: ["Project Planning", "Estimation", "Scheduling", "Risk Management", "Quality Assurance"] },
    ],
  },
  {
    number: 6,
    subjects: [
      { 
        id: "s6_aiml", 
        name: "Artificial Intelligence & ML", 
        topics: ["AI Techniques", "Logic", "Neural Networks", "Supervised", "Unsupervised"],
        modules: [
          {
            name: "Module I: INTRO TO AI & PROBLEM SOLVING",
            topics: [
              "Introduction to AI: Problems, Techniques, and Domains",
              "Problem Solving: Search Algorithms (BFS, DFS), Knowledge Rep",
              "Informed Search: A*, Heuristic, Hill Climbing, Simulated Annealing",
              "Constraint Satisfaction Problems (CSP) basics"
            ]
          },
          {
            name: "Module II: KNOWLEDGE REP & REASONING",
            topics: [
              "Logic: Propositional & Predicate Logic representation",
              "Structure: Semantic Networks & Frames, Rule-based systems",
              "Expert Systems: Concepts, Forward vs Backward reasoning",
              "Logics for non-monotonic Reasoning"
            ]
          },
          {
            name: "Module III: INTRODUCTION TO NEURAL NETWORKS",
            topics: [
              "Artificial Neural Network: Brain vs Perceptron Model",
              "Architecture: Single vs Multi-Layer Perceptron Learning",
              "Python Packages: Hands-on with Keras and Scikit-Learn"
            ]
          },
          {
            name: "Module IV: MACHINE LEARNING FUNDAMENTALS",
            topics: [
              "Intro to ML: Supervised (Regression, Decision Tree)",
              "Unsupervised: Clustering (K-means), Dim-Reduction (PCA)",
              "Reinforcement Learning elements and Feature Engineering",
              "Evaluation: Confusion matrix and practical ML model setup"
            ]
          },
          {
            name: "Module V: HANDS-ON AI & ML (LAB)",
            topics: [
              "Implementation of Search (BFS, DFS) and Neural Networks",
              "Supervised Learning via Linear Regression & Decision Trees",
              "Unsupervised Clustering (K-means) and PCA techniques",
              "Case Study: Usage of AI tools in real-world applications"
            ]
          }
        ]
      },
      { 
        id: "s6_os", 
        name: "Operating Systems", 
        topics: ["Process Management", "Scheduling", "Memory", "Shell Programming"],
        modules: [
          {
            name: "Module I: INTRO & PROCESS MANAGEMENT",
            topics: [
              "OS History, Objectives, and Core Functions",
              "Process: States, Process Control Block (PCB), Operations",
              "Inter-process Communication and Cooperating Processes"
            ]
          },
          {
            name: "Module II: SCHEDULING & SYNCHRONIZATION",
            topics: [
              "CPU Scheduling: Algorithms (FCFS, SJF, Priority, RR)",
              "Synchronization: Critical Section, Semaphores, Deadlocks",
              "Deadlock: Prevention, Avoidance (Banker's), Detection & Recovery"
            ]
          },
          {
            name: "Module III: MEMORY MANAGEMENT",
            topics: [
              "Physical vs Logical Address, Fragmentation, Paging",
              "Segmentation and Virtual Memory: Demand Paging",
              "Page Replacement Algorithms (FIFO, LRU, Optimal)"
            ]
          },
          {
            name: "Module IV: LINUX SHELL PROGRAMMING",
            topics: [
              "Linux Shell Basics: Command-line arguments, Redirection",
              "File Management: ls, cd, pwd, mkdir, rm, cp, mv, chmod",
              "Shell Scripting: Loops, Conditionals, Arrays, and Functions",
              "Network Commands: ipconfig, ping, date, time"
            ]
          },
          {
            name: "Module V: PRACTICAL APPLICATIONS (LAB)",
            topics: [
              "Implementing Process Scheduling and Memory Allocation",
              "Developing Shell Scripts using Unix/Linux Command sets",
              "Simulating Deadlock Avoidance and Page Replacement"
            ]
          }
        ]
      },
      { 
        id: "s6_ads", 
        name: "Advanced Data Structures", 
        topics: ["Algorithm Quality", "Complexity", "Linked Lists", "Non-linear DS"],
        modules: [
          {
            name: "Module I: INTRO TO DS & ANALYSIS",
            topics: [
              "ADT concepts and Algorithm Quality (Space/Time Complexity)",
              "Asymptotic Notations: Big Oh, Big Omega, Little Oh, Theta",
              "Algorithm Design steps and methods of specification"
            ]
          },
          {
            name: "Module II: EFFICIENT ALGORITHM DESIGN",
            topics: [
              "Brute Force, Divide-and-Conquer, Branch-and-Bound",
              "Greedy approach (Kruskal/Prim) and Dynamic Programming",
              "Backtracking (Sum of subsets) and String pattern matching"
            ]
          },
          {
            name: "Module III: LINKED LIST IMPLEMENTATIONS",
            topics: [
              "Operations on Singly, Circular, and Doubly Linked Lists",
              "Recursive lists, Skip lists, and Deterministic creation"
            ]
          },
          {
            name: "Module IV: NON-LINEAR DATA STRUCTURES",
            topics: [
              "Binary Search Trees (BST), AVL, and Red-Black Trees",
              "Multi-way Trees (B-Tree), Graphs, and Heap structures",
              "Heap Applications: Min-Max heaps, Deaps, Leftist heaps"
            ]
          },
          {
            name: "Module V: PRACTICAL IMPLEMENTATIONS (LAB)",
            topics: [
              "Implementation of BST, AVL, and Graph traversals",
              "Sorting in Singly Linked List and Skip-list creation",
              "Depth First Search (DFS) and Breadth First Search (BFS)"
            ]
          }
        ]
      },
      { 
        id: "s6_r", 
        name: "Fundamentals of R", 
        topics: ["R Objects", "Matrix", "Control Flow", "Dplyr", "Visualization"],
        modules: [
          {
            name: "Module I: FUNDAMENTALS OF R",
            topics: [
              "Installation, Constants, Variables, and Operators in R",
              "Data types, R Objects, Built-in functions, Input/Output"
            ]
          },
          {
            name: "Module II: VECTORS, MATRICES AND LISTS",
            topics: [
              "Vector Arithmetic and operations on Vector elements",
              "Matrix operations and Transpose, Creating/Manipulating Lists",
              "Merging lists and converting lists to vectors"
            ]
          },
          {
            name: "Module III: CONTROL & FUNCTIONS",
            topics: [
              "Control: if-else, switch, Loops (while, for, repeat)",
              "Functions: Formals vs Actuals, Scope (Global/Local)",
              "Recursive functions, String functions, Array calculations"
            ]
          },
          {
            name: "Module IV: DATA MANIPULATION & VIZ",
            topics: [
              "Dplyr Package: Load data, Select, Filter, Reorder, Pipe",
              "Visualization: Bar plot, Histogram, Pie chart, Scatter, Box plot",
              "Plot() function and categorical data visualization"
            ]
          },
          {
            name: "Module V: PRACTICAL APPLICATIONS (LAB)",
            topics: [
              "Analyze mtcars dataset using Dplyr and Visualization",
              "Implementation of Vectors, Matrices, and List operations",
              "Building control logic and custom R functions"
            ]
          }
        ]
      },
      { 
        id: "s6_fp", 
        name: "Final Project", 
        topics: ["Requirement Analysis", "Design", "Implementation", "Testing", "Viva"],
        modules: [
          {
            name: "Module I: PROJECT PLANNING",
            topics: [
              "Topic selection and Requirement Analysis",
              "System Design: UML Diagrams and Database Schema"
            ]
          },
          {
            name: "Module II: IMPLEMENTATION & VIVA",
            topics: [
              "Coding, Module Integration, and Unit Testing",
              "Thesis Documentation, Project Presentation, and Viva Voce"
            ]
          }
        ]
      },
    ],
  },
];

export const foodTechSyllabus: Semester[] = [
  {
    number: 1,
    subjects: [
      {
        id: "ft_s1_fft",
        name: "Fundamentals of Food Technology",
        topics: ["Food Science", "Nutrients", "Probiotics", "Food Groups", "Preservation", "Safety", "FSSAI"],
        modules: [
          {
            name: "Module 1: Introduction to Food Science and Technology",
            topics: [
              "Definition - Food, Importance and scope of Food Science and Food Technology",
              "Basic Nutrients – Functions and sources",
              "Prebiotic, Probiotic",
              "Nutraceuticals and Phytonutrients",
              "Organic foods, GM foods"
            ]
          },
          {
            name: "Module 2: Food Groups",
            topics: [
              "Pulses & Legumes – Types, Nutritive value",
              "Nuts & Oilseeds - Types and Nutritive value",
              "Fruits, Vegetables and - Classification and composition",
              "Wheat and Rice - Structure and composition",
              "Meat, Fish - composition and Nutritive value",
              "Egg - Structure and Nutritive Value",
              "Milk - Composition and Nutritive Value",
              "Spices and Plantation products - Classification and importance"
            ]
          },
          {
            name: "Module 3: Food Processing and Safety",
            topics: [
              "Food Preservation - Principles and Types",
              "Food Packaging - Importance and Common materials",
              "Food Additives",
              "Major Sectors of Food Processing Industry, National and International Research Institutes",
              "Food Safety - Need for Food Safety. Hazards in Foods - Physical, Chemical and Biological",
              "FSSAI"
            ]
          },
          {
            name: "Module 4: Sensory Evaluation",
            topics: [
              "Sensory assessment - Appearance of food - visual perception, colour of foods, smell, flavour and Taste",
              "Types of panels - Laboratory Set-up and Equipments",
              "Types of Sensory Evaluation and Importance"
            ]
          },
          {
            name: "Module 5: Practical (Lab)",
            topics: [
              "Standardization of NaOH and HCl",
              "Determination of Moisture using Hot air oven/Distillation/Infrared",
              "Determination of Acidity & pH",
              "Determination of TSS",
              "Qualitative test for carbohydrates – Molisch's test, Benedict's test, Iodine test",
              "Anthrone test, Selivanoff's test",
              "Qualitative Test of Proteins",
              "Industrial Visit: Food Processing Unit"
            ]
          }
        ]
      }
    ]
  },
  {
    number: 2,
    subjects: [
      {
        id: "ft_s2_fm1",
        name: "Food Microbiology - 1",
        topics: ["Microbiology History", "Bacteria", "Fungi", "Yeast", "Virus", "Cultivation", "Growth Factors"],
        modules: [
          {
            name: "Module I: Introduction to Microbiology",
            topics: [
              "History and Development of Microbiology - Germ theory of disease, Koch’s postulates",
              "Theory of spontaneous generation and biogenesis",
              "Microscopy – History, Parts of microscope, properties",
              "Types of microscopes - Light microscope (Bright field, Dark field)",
              "Fluorescence and Electron microscope"
            ]
          },
          {
            name: "Module II: Characteristics of Microorganisms in Food",
            topics: [
              "Bacteria - size, shape and arrangement",
              "Bacteria - Structure, Morphology",
              "Bacteria - Reproduction - Binary fission, Transformation, Transduction and conjugation"
            ]
          },
          {
            name: "Module III: Other Microorganisms",
            topics: [
              "Fungi – Morphology, Classification, Reproduction – Sexual and Asexual",
              "Yeast - Structure, Morphology, Reproduction – Sexual and Asexual",
              "Virus - Classification, Composition, Morphology",
              "Replication of virus - lysogenic & lytic cycle",
              "Algae: Types"
            ]
          },
          {
            name: "Module IV: Cultivation of Micro-organisms",
            topics: [
              "Methods of isolation and cultivation, Serial dilution method",
              "Pure culture technique - streak plate, pour plate, spread plate",
              "Enumeration of Microorganisms qualitative and Quantitative",
              "Cultural Media – classification, Selective, Differential, Enrichment Media",
              "Staining techniques – simple, differential staining (Gram staining, Acid-fast)"
            ]
          },
          {
            name: "Module V: Microbial Growth in Food",
            topics: [
              "Factors affecting the growth of microorganisms in food (intrinsic, extrinsic)",
              "Nutritional requirement of microorganisms",
              "Bacterial growth curve and phases",
              "Microbial growth in food environmental conditions"
            ]
          }
        ]
      }
    ]
  },
  {
    number: 3,
    subjects: [
      {
        id: "ft_s3_ns",
        name: "Nutrition Science",
        topics: ["Health & Nutrition", "Energy", "Carbohydrates", "Proteins", "Lipids", "Vitamins", "Minerals"],
        modules: [
          {
            name: "Module I: Health, Nutrition & Food",
            topics: [
              "Physical, mental, social and spiritual health",
              "Determinants & indicators of health",
              "Nutrition & malnutrition, importance of ideal nutrition",
              "Balanced diet, BMI, Food guide, Pyramid and RDA",
              "Menu Planning, Significance of Menu Planning, Menu planning for family, Factors influencing meal planning",
              "Nutrition for the normal life cycle, Nutrition during Pregnancy and Lactation",
              "Nutrition for Fitness and Sports",
              "Nutrigenetics and Genomics",
              "HFSS foods",
              "DASH diet"
            ]
          },
          {
            name: "Module II: Energy",
            topics: [
              "Definition, Calorie & Joule",
              "Measurement of Calorific values of Food",
              "Basal metabolism-BMR",
              "Energy requirements & expenditure"
            ]
          },
          {
            name: "Module III: Carbohydrates, Protein & Lipids",
            topics: [
              "Sources",
              "Nutritional classification",
              "Digestion, Absorption and Transportation",
              "Health disorders due to its imbalance in the body",
              "Potential health benefits"
            ]
          },
          {
            name: "Module IV: Vitamins, Minerals, & Water",
            topics: [
              "Nutritional classification and Sources",
              "Digestion, Absorption and Transportation",
              "Health benefits and disorders due to its imbalance in the body"
            ]
          },
          {
            name: "Module V: OPEN ENDED: DIET THERAPY",
            topics: [
              "Dietary management and therapeutic adaptations",
              "Role of dietitian in health and disease",
              "Patient education and counseling basics"
            ]
          }
        ]
      },
      {
        id: "ft_s3_fc",
        name: "Food Chemistry",
        topics: ["Carbohydrates", "Proteins", "Lipids", "Water", "Pigments", "Enzymes", "Colloids"],
        modules: [
          {
            name: "Module I: Classification, structure, sources & properties of carbohydrates, proteins, lipids and water",
            topics: [
              "Carbohydrates: Monosaccharides - Glucose, fructose and galactose structure and properties",
              "Oligosaccharides - Maltose, lactose and sucrose, crystallization, inversion, hydrolysis",
              "Reducing and non-reducing sugars, Caramelisation and Maillard reaction",
              "Polysaccharides - Starch structure of amylose and amylopectin, Gelatinisation and retrogradation",
              "Cellulose, hemicellulose, pectic substances, gums and dietary fibre",
              "Proteins: Structure and classification of amino acids and proteins",
              "Important food proteins and physiochemical properties - denaturation",
              "Protein Determination methods",
              "Lipids: Chemistry, Classification and Properties of Lipids and Fatty acids",
              "Rancidity, auto oxidation and hydrolysis, Anti-oxidants",
              "Water: Structure of water and Ice, physical and chemical properties",
              "Free and bound water, moisture determination, Water activity"
            ]
          },
          {
            name: "Module II: Pigments",
            topics: [
              "Structure, sources and properties of pigments: Chlorophyll and Carotenoids",
              "Flavonoids and anthocyanins, Anthoxanthins and myoglobin",
              "Methods to prevent discoloration of natural pigments"
            ]
          },
          {
            name: "Module III: Enzymes",
            topics: [
              "Introduction, definition, occurrence, classification and properties",
              "Factors effecting enzyme activity",
              "Enzymes in food and its applications in food industry"
            ]
          },
          {
            name: "Module IV: Colloids",
            topics: [
              "Chemistry of colloids, properties of solutions, sols, suspensions and emulsions",
              "Types of emulsions and Emulsifying agents, Food colloids"
            ]
          },
          {
            name: "Module V: PRATICALS",
            topics: [
              "Standardization of NaOH and HCl",
              "Determination of moisture, acidity and pH",
              "Qualitative test for carbohydrates and proteins",
              "Qualitative analysis of protein by colorimetry",
              "Analysis of lipids: Iodine value, Free fatty acids, Peroxide value, Saponification value",
              "Analysis of water: Hardness, Alkalinity, Acidity, Chloride",
              "Quantitative methods: Protein, Carbohydrates, Fat, Ash, Fibre"
            ]
          }
        ]
      }
    ]
  }
];
