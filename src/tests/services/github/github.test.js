import { searchByUserName, getRepositoriesByUserName } from '../../../services/github/github';

describe('Github API', () => {

    test('Testing searchByUserName invalid username', async () => {
        const response = await searchByUserName('drpcs2');
        expect(response.message).toEqual(`Not Found`);
    });

    test('Testing searchByUserName valid username', async () => {
        const response = await searchByUserName('drpcs');
        expect(response.name).toEqual(`Diego`);
    });  
    
    test('Testing getRepositoriesByUserName invalid username', async () => {
        const response = await getRepositoriesByUserName('drpsc3');
        expect(response.message).toEqual(`Not Found`);
    }); 

    test('Testing getRepositoriesByUserName valid username', async () => {
        const response = await getRepositoriesByUserName('drpcs');
        expect(response[0].owner.login).toEqual(`drpcs`);
    }); 
});