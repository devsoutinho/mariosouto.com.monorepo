// [SETUP: ADD YOUR CONTRIBUTION HERE]
const defaultContribution = {
  "title": "4 DICAS de CSS que você PRECISA saber (a última é de JS mas é visual) | Como fazer um site awwwards?",
  "url": "https://youtu.be/p3rXmeI0KEk",
  "date": "2021-12-13T03:00:00.000Z",
  "excerpt": "Você, ficou curioso já pensando como são feitos aqueles sites do awwards? Pois chegou a hora de compartilhar algumas dicas que eu aprendi ao longo da carreira que pode ajudar você a chegar lá!"
};

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
