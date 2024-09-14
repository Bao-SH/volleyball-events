const automator = require('miniprogram-automator');

describe('eventList', () => {
  let miniProgram
  let page
  jest.setTimeout(30000); 
  beforeAll(async () => {
    miniProgram = await automator.launch({
      projectPath: '/Users/shuanghui.bao/WeChatProjects/miniprogram-3', // 项目文件地址
    })
    //设置初始化数据
    await miniProgram.evaluate(() => {
      getApp().globalData.events = [
        { id: 1, name: 'Event 1', date: '2024-09-14', startTime: '10:00', endTime: '11:00', location: 'Location 1' },
        { id: 2, name: 'Event 2', date: '2024-09-15', startTime: '12:00', endTime: '13:00', location: 'Location 2' },
      ]
    })
    page = await miniProgram.reLaunch('/pages/eventList/eventList');
    // 打开 EventList 页面
    await page.waitFor(500); // 等待页面加载
    const storedEvents = await miniProgram.callWxMethod('getStorageSync', 'events');
    console.log("存储的事件数据:", storedEvents);
  })
  afterAll(async () => {
    await miniProgram.callWxMethod('setStorage', {
      key: 'events',
      data: []
    });
  })

  it('render events correctly', async () => {
    //模拟事件展示
    const element = await page.$('page'); // 获取整个页面的元素
    expect(await element.wxml()).toMatchSnapshot();
  })

  it('should navigate to event detail page when click create Event', async () => {
    // 模拟创建事件操作
    const createButton = await page.$('.create-btn');
    await createButton.tap();
    // 等待页面跳转
    await page.waitFor(500); 
    // 检查是否跳转到事件详情页面
    const currentPage = await miniProgram.currentPage();
    expect(currentPage.path).toBe('pages/eventDetail/eventDetail')
  })

  it('should delete event correctly when confirmed in modal', async () => {
    // 返回 EventList 页面
    await miniProgram.navigateBack();
    await page.waitFor(1000);
    // 模拟点击 Modal 上的 "确认" 按钮
    await miniProgram.mockWxMethod('showModal', 
    {
      confirm: true,  
      cancel: false
    })
    // 点击第一个删除按钮
    const deleteButton = await page.$$('.delete-btn');
    await deleteButton[0].tap();
    // 等待 Modal 出现
    await page.waitFor(500);
    const eventListAfterDelete = await page.$$('.event-item');
    expect(eventListAfterDelete.length).toBe(1);
  });
})
