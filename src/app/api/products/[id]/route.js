const products = [
    {
        id: 1,
        name: "Labial Mate Rojo Pasión",
        description: "Labial de larga duración con acabado mate y pigmentación intensa",
        price: 18.99,
        image: "/images/producto1.jpg",
        stock: 0,
        colors: ["#FF0000", "#CC0000"],
        category: "mate",
        details: [
            "Duración hasta 12 horas",
            "Fórmula vegana y cruelty-free",
            "Resistente al agua",
            "Peso neto: 5ml"
        ]
    },
    {
        id: 2,
        name: "Gloss Nude Natural",
        description: "Gloss hidratante con efecto volumizador y acabado brillante",
        price: 15.50,
        image: "/images/producto2.jpg",
        stock: 12,
        colors: ["#F5D5C0", "#E7BC91"],
        category: "gloss",
        details: [
            "Duración hasta 12 horas",
            "Fórmula vegana y cruelty-free",
            "Resistente al agua",
            "Peso neto: 5ml"
        ]
    },
    {
        id: 3,
        name: "Labial Líquido Duradero",
        description: "Labial líquido que no se transfiere y dura hasta 12 horas",
        price: 22.75,
        image: "/images/producto3.jpg",
        stock: 8,
        colors: ["#C71585", "#DB7093"],
        category: "liquido",
        details: [
            "Duración hasta 12 horas",
            "Fórmula vegana y cruelty-free",
            "Resistente al agua",
            "Peso neto: 5ml"
        ]
    },
    {
        id: 4,
        name: "Bálsamo Labial Hidratante",
        description: "Bálsamo nutritivo con manteca de karité para labios suaves y protegidos",
        price: 12.99,
        image: "/images/producto4.jpg",
        stock: 20,
        colors: ["#FFC0CB", "#FFDAB9"],
        category: "bálsamo",
        details: [
            "Hidratación de larga duración",
            "Fórmula vegana y cruelty-free",
            "Con vitamina E y manteca de karité",
            "Peso neto: 4g"
        ]
    },
    {
        id: 5,
        name: "Labial Mate Vino Intenso",
        description: "Labial de acabado mate en tono vino perfecto para eventos especiales",
        price: 19.50,
        image: "/images/producto5.jpg",
        stock: 5,
        colors: ["#8B0000", "#800020"],
        category: "mate",
        details: [
            "Duración hasta 12 horas",
            "Fórmula vegana y cruelty-free",
            "Acabado ultra mate",
            "Peso neto: 5ml"
        ]
    },
    {
        id: 6,
        name: "Gloss Rosa Cristal",
        description: "Gloss ligero con partículas brillantes para un efecto luminoso natural",
        price: 16.25,
        image: "/images/producto6.jpg",
        stock: 10,
        colors: ["#FFC0CB", "#FFB6C1"],
        category: "gloss",
        details: [
            "Efecto 3D volumizador",
            "Fórmula vegana y cruelty-free",
            "No pegajoso",
            "Peso neto: 5ml"
        ]
    },
    {
        id: 7,
        name: "Labial Líquido Coral Vibrante",
        description: "Labial líquido de color coral que ofrece un look fresco y veraniego",
        price: 21.00,
        image: "/images/producto7.jpg",
        stock: 7,
        colors: ["#FF7F50", "#FFA07A"],
        category: "liquido",
        details: [
            "Duración hasta 10 horas",
            "Fórmula vegana y cruelty-free",
            "Resistente a roces y bebidas",
            "Peso neto: 5ml"
        ]
    },
    {
        id: 8,
        name: "Bálsamo Color Caramelo",
        description: "Bálsamo hidratante con un sutil toque de color caramelo",
        price: 13.50,
        image: "/images/producto8.jpg",
        stock: 15,
        colors: ["#D2B48C", "#C68642"],
        category: "bálsamo",
        details: [
            "Hidratación profunda",
            "Aroma dulce natural",
            "Con manteca de cacao",
            "Peso neto: 4g"
        ]
    },
    {
        id: 9,
        name: "Labial Mate Nude Elegante",
        description: "Labial mate de tono nude para un look sofisticado y versátil",
        price: 18.25,
        image: "/images/producto9.jpg",
        stock: 9,
        colors: ["#D2B48C", "#CBB195"],
        category: "mate",
        details: [
            "Duración hasta 10 horas",
            "Fórmula vegana y cruelty-free",
            "Textura ligera y cremosa",
            "Peso neto: 5ml"
        ]
    },
    {
        id: 10,
        name: "Gloss Dorado Luminoso",
        description: "Gloss con destellos dorados para darle un toque glamuroso a tus labios",
        price: 17.99,
        image: "/images/producto10.jpg",
        stock: 6,
        colors: ["#FFD700", "#FFF8DC"],
        category: "gloss",
        details: [
            "Brillo duradero",
            "Fórmula vegana y cruelty-free",
            "Apto para usar solo o sobre otro labial",
            "Peso neto: 5ml"
        ]
    },
    {
        id: 11,
        name: "Labial Líquido Rosa Vintage",
        description: "Labial líquido en un elegante tono rosa viejo, ideal para el día a día",
        price: 22.00,
        image: "/images/producto11.jpg",
        stock: 4,
        colors: ["#C08081", "#D8B2B2"],
        category: "liquido",
        details: [
            "Duración hasta 12 horas",
            "Fórmula vegana y cruelty-free",
            "Secado rápido",
            "Peso neto: 5ml"
        ]
    },
    {
        id: 12,
        name: "Bálsamo Refrescante Menta",
        description: "Bálsamo labial refrescante con extracto natural de menta",
        price: 11.75,
        image: "/images/producto12.jpg",
        stock: 18,
        colors: ["#98FB98", "#90EE90"],
        category: "bálsamo",
        details: [
            "Sensación refrescante inmediata",
            "Fórmula vegana y cruelty-free",
            "Protección contra el agrietamiento",
            "Peso neto: 4g"
        ]
    },
    {
        id: 13,
        name: "Labial Mate Rosa Fucsia",
        description: "Labial mate de alta cobertura en vibrante tono rosa fucsia",
        price: 19.75,
        image: "/images/producto13.jpg",
        stock: 11,
        colors: ["#FF69B4", "#FF1493"],
        category: "mate",
        details: [
            "Duración hasta 12 horas",
            "Fórmula vegana y cruelty-free",
            "Pigmentación extrema",
            "Peso neto: 5ml"
        ]
    },
    {
        id: 14,
        name: "Gloss Melocotón Brillante",
        description: "Gloss hidratante con un delicado tono melocotón y acabado radiante",
        price: 16.75,
        image: "/images/producto14.jpg",
        stock: 13,
        colors: ["#FFDAB9", "#FFE4B5"],
        category: "gloss",
        details: [
            "Brillo espejo de larga duración",
            "Fórmula vegana y cruelty-free",
            "Textura ligera y no pegajosa",
            "Peso neto: 5ml"
        ]
    },
    {
        id: 15,
        name: "Labial Líquido Marrón Chocolate",
        description: "Labial líquido de alta fijación en un tono marrón intenso y elegante",
        price: 23.50,
        image: "/images/producto15.jpg",
        stock: 5,
        colors: ["#5C4033", "#7B3F00"],
        category: "liquido",
        details: [
            "Duración extrema hasta 16 horas",
            "Fórmula vegana y cruelty-free",
            "No transfiere y resistente al agua",
            "Peso neto: 5ml"
        ]
    }


];