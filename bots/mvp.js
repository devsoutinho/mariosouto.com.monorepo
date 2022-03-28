const DADOS_INICIAIS = {
    "data": {
        "posts": [
            null,
            {
                "title": "Como criar uma newsletter gratuitamente? #Revue",
                "url": "https://youtu.be/aFMAbikbSl0",
                "date": "2022-02-16T03:00:00.000Z",
                "excerpt": null
            },
            {
                "title": "Como documentar códigos? Documentando Front End com Storybook!",
                "url": "https://youtu.be/R41_Qedrzik",
                "date": "2022-01-08T03:00:00.000Z",
                "excerpt": null
            },
            {
                "title": "Como usar imagens no Next.js?",
                "url": "https://youtu.be/LQqliNavVYQ",
                "date": "2022-01-28T03:00:00.000Z",
                "excerpt": null
            },
            {
                "title": "CSS-in-JS na prática! Criando componentes com React e CSS no NextJS",
                "url": "https://youtu.be/aDKxJfJiM28",
                "date": "2022-01-15T03:00:00.000Z",
                "excerpt": null
            },
            {
                "title": "#DevDicas pegando foto de perfil para fazer upload em algum lugar! #GitHub #DevSoutinho",
                "url": "https://youtu.be/23rjjk9vVYc",
                "date": "2022-02-10T03:00:00.000Z",
                "excerpt": null
            },
            {
                "title": "Estruturas de dados com JavaScript - Básico pra você usar agora!",
                "url": "https://youtu.be/MweeZn1rR8s",
                "date": "2022-03-28T03:00:00.000Z",
                "excerpt": null
            },
            {
                "title": "Faculdade pra trabalhar com programação? Precisa de faculdade pra ser dev? #OPINIAO_PESSOAL",
                "url": "https://youtu.be/C_0hpYvH2AM",
                "date": "2022-02-11T03:00:00.000Z",
                "excerpt": null
            },
            {
                "title": "Frameworks vs Código \"puro\" em projetos: Por que usamos? Vale a pena de verdade?",
                "url": "https://www.youtube.com/watch?v=ChALzuWPs4k",
                "date": "2022-03-21T11:30:00.000Z",
                "excerpt": null
            },
            {
                "title": "FullStack é pato? Visão geral da área de programação: Front End vs Back End, \"qual é mais difícil?\"",
                "url": "https://www.youtube.com/watch?v=z8Eqdn62xZg",
                "date": "2022-03-14T11:30:00.000Z",
                "excerpt": null
            },
            {
                "title": "Git e GitHub: Como subir meu primeiro projeto? Como versionar um projeto? #BaseDev #DevIniciante",
                "url": "https://youtu.be/-6JwElEt49w",
                "date": "2022-01-21T03:00:00.000Z",
                "excerpt": null
            },
            null,
            {
                "title": "No 'Access-Control-Allow-Origin' header is present on the requested resource. | RESOLVIDO!",
                "url": "https://youtu.be/bk661C4WY6I",
                "date": "2022-02-05T03:00:00.000Z",
                "excerpt": null
            },
            null,
            {
                "title": "Qual carreira escolher para trabalhar com tecnologia e programação? Front End x Back End x Mobile",
                "url": "https://youtu.be/0lIexK1xPlU",
                "date": "2022-02-26T03:00:00.000Z",
                "excerpt": null
            },
            {
                "title": "QUANTAS LINGUAGENS DE PROGRAMAÇÃO eu preciso SABER? | Quais linguagens eu já programei?",
                "url": "https://youtu.be/FDQbzP7PBiw",
                "date": "2021-12-28T03:00:00.000Z",
                "excerpt": null
            },
            null,
            {
                "title": "Tour pelo meu setup feat 50k inscritos e 2 anos de canal! OBRIGADO",
                "url": "https://youtu.be/HGXcE0sudr4",
                "date": "2022-02-18T03:00:00.000Z",
                "excerpt": null
            }
        ]
    }
};

// DevSoutinho - MVP Bot

// [Setup]
function mvpDevSoutinhoBot(arr) {
    function later(delay) {
        return new Promise(function (resolve) {
            setTimeout(resolve, delay);
        });
    }
    // ============================================================
    const mvpContributorActivity = {
        title: 'Example Title',
        url: 'https://example.com/youtube',
        date: '03/01/2022',
        excerpt: 'Sample excerpt'
    };
    // [Code]
    const { url: _url, title: _title, date: _currentDate, excerpt: _description } = mvpContributorActivity;
    
    // 1. Click add new Activity
    addNewActivityBtn.click()
    
    // 2. Change Activity Type
    await later(3 * 1000);
    activityTypeSelector.selectedIndex = 22;
    
    // 3. Change Principal Cointribution Type
    select_contributionAreasDDL.selectedIndex = 10;
    
    // 4. Change Date of Activity
    DateOfActivity.value = _currentDate.split('/').map(item => Number(item)).join('/')
    // 5. Change Title of Activity
    TitleOfActivity.value = _title;
    // 6. Change URL of Activity
    ReferenceUrl.value = _url;
    // 7. Change Description of Activity
    Description.value = _description;
    // 8. "Change Number of Articles"
    AnnualQuantity.value = 1;
}

DADOS_INICIAIS.data.posts.forEach(() => {
    mvpDevSoutinhoBot();
});
