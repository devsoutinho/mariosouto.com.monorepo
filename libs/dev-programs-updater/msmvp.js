const contributionsBla = [
  {
    "postType": "YOUTUBE_VIDEO",
    "title": "Led que sincroniza com a TV e o VideoGame? Ambilight com Raspberry PI e Arduino!",
    "url": "https://youtu.be/I-DcBIUsCZw",
    "date": "2021-07-30T03:00:00.000Z",
    "excerpt": "Imagina se a sua TV reagisse gerando luzes no fundo com qualquer imagem que tivesse na tela com uma experiência 10x mais imersiva? Isso existe e o nome é ambilight! Eu aprendi recentemente a fazer foi uma parada muuito legal e minhas sessões de jogatina e netflix nunca mais foram as mesmas. Como o processo de construção foi bem massa, resolvi compartilhar nesse vídeo aqui com vocês!"
  },
]


// [SETUP: ADD YOUR CONTRIBUTION HERE]
const defaultContribution = contributionsBla[0];

// DevSoutinho - MVP Bot
async function mvpDevSoutinhoBot(mvpContributorActivity = defaultContribution) {
    function later(delay) {
        return new Promise(function (resolve) {
            setTimeout(resolve, delay);
        });
    }
    // ============================================================
    // [Code]
    const { url: _url, title: _title, date: _currentDate, excerpt: _description } = mvpContributorActivity;
    
    // 1. Click add new Activity
    addNewActivityBtn.click()
    
    // 2. Change Activity Type
    await later(2 * 1000);
    activityTypeSelector.selectedIndex = 22;
    Array.from(activityTypeSelector.querySelectorAll('option'))
    .forEach((el) => {
        if(el.getAttribute('value') !== 'e56464de-179a-e411-bbc8-6c3be5a82b68') {
            el.removeAttribute('selected')
        } else {
            el.setAttribute('selected', 'selected');
        }
    })
    activityTypeSelector.classList.add('valid')
    const event = new Event('change');
    activityTypeSelector.dispatchEvent(event);
    
    // 3. Change Principal Cointribution Type
    await later(1 * 1000);
    select_contributionAreasDDL.selectedIndex = 10;
    select_contributionAreasDDL.classList.add('valid');
    select_contributionAreasDDL.dispatchEvent(event);
    
    // 4. Change Date of Activity
    DateOfActivity.value = new Date(_currentDate).toLocaleDateString().split('/').map(item => Number(item)).join('/')
    // 5. Change Title of Activity
    TitleOfActivity.value = _title;
    // 6. Change URL of Activity
    ReferenceUrl.value = _url;
    // 7. Change Description of Activity
    Description.value = _description;
    // 8. "Change Number of Articles"
    AnnualQuantity.value = 1;

    // 9. Submit activity
    submitActivityButton.click();
}
mvpDevSoutinhoBot();
