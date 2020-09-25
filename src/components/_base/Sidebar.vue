<template>
  <div class="sidebar">
    <div class="sidebar-header">
      <b-row>
        <b-col cols="9">
          <span>Skuychat</span>
        </b-col>
        <b-col cols="3" align="right">
          <b-dropdown size="lg" variant="link" right toggle-class="text-decoration-none" no-caret>
            <template v-slot:button-content>
              <font-awesome-icon icon="bars" class="text-link bar-icon" />
            </template>
            <b-dropdown-item href="#">
              <font-awesome-icon :icon="['far', 'user']" class="list-icon" />
              <span>Contacts</span>
            </b-dropdown-item>
            <b-dropdown-item href="#">
              <font-awesome-icon :icon="['far', 'bookmark']" class="list-icon" />
              <span>Save Messages</span>
            </b-dropdown-item>
            <b-dropdown-item href="#" v-b-modal.add-product-modal>
              <font-awesome-icon icon="user-plus" class="list-icon" />
              <span>Invite Fiends</span>
            </b-dropdown-item>
            <b-modal id="add-product-modal"
            ref="add-product-modal"
            header-bg-variant="info"
            header-text-variant="light" centered
            hide-footer title="Add Friend">
              <p class="my-4">Insert your friend email</p>
              <b-form inline>
                <b-input placeholder="Email"></b-input>
                <b-button variant="info" class="ml-2">
                  <font-awesome-icon icon="user-plus" class="list-icon" />
                </b-button>
              </b-form>
            </b-modal>
          </b-dropdown>
        </b-col>
      </b-row>
    </div>
    <div class="sidebar-search">
      <b-row>
        <b-col cols="10">
          <input type="search" placeholder="Type your message...">
        </b-col>
        <b-col cols="2" align="right">
          <font-awesome-icon icon="plus" class="text-link" />
        </b-col>
      </b-row>
    </div>
    <div class="message-status">
      <b-row class="status-collection">
        <b-col class="status-items">All</b-col>
        <b-col class="status-items active">Important</b-col>
        <b-col class="status-items">Unread</b-col>
      </b-row>
    </div>
    <div class="card-chat-collection">
      <div class="card-chat-items">
        <div class="card-chat-image">
          <img src="../../assets/selena-gomez.jpg" alt="">
        </div>
        <div class="card-chat-wrapper">
          <div class="card-chat-top">
            <span class="card-chat-time">12.00</span>
            <div class="card-chat-name">Selena Gomez</div>
          </div>
          <div class="card-chat-bottom">
            <div class="card-chat-text">
              <span>Lorem ipsum dolor sit amet consectetur adipisicing elit.</span>
            </div>
            <div>
              <span class="card-chat-count">2</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="card-chat-collection">
      <div class="card-chat-items">
        <div class="card-chat-image">
          <img src="../../assets/selena-gomez.jpg" alt="">
        </div>
        <div class="card-chat-wrapper">
          <div class="card-chat-top">
            <span class="card-chat-time">12.00</span>
            <div class="card-chat-name">Selena Gomez</div>
          </div>
          <div class="card-chat-bottom">
            <div class="card-chat-text">
              <span>Lorem ipsum dolor sit amet consectetur adipisicing elit.</span>
            </div>
            <div>
              <span class="card-chat-count">2</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="card-chat-collection">
      <div class="card-chat-items">
        <div class="card-chat-image">
          <img src="../../assets/selena-gomez.jpg" alt="">
        </div>
        <div class="card-chat-wrapper">
          <div class="card-chat-top">
            <span class="card-chat-time">12.00</span>
            <div class="card-chat-name">Selena Gomez</div>
          </div>
          <div class="card-chat-bottom">
            <div class="card-chat-text">
              <span>Lorem ipsum dolor sit amet consectetur adipisicing elit.</span>
            </div>
            <div>
              <span class="card-chat-count">2</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="card-chat-collection">
      <div class="card-chat-items">
        <div class="card-chat-image">
          <img src="../../assets/selena-gomez.jpg" alt="">
        </div>
        <div class="card-chat-wrapper">
          <div class="card-chat-top">
            <span class="card-chat-time">12.00</span>
            <div class="card-chat-name">Selena Gomez</div>
          </div>
          <div class="card-chat-bottom">
            <div class="card-chat-text">
              <span>Lorem ipsum dolor sit amet consectetur adipisicing elit.</span>
            </div>
            <div>
              <span class="card-chat-count">2</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="card-chat-collection">
      <div class="card-chat-items">
        <div class="card-chat-image">
          <img src="../../assets/selena-gomez.jpg" alt="">
        </div>
        <div class="card-chat-wrapper">
          <div class="card-chat-top">
            <span class="card-chat-time">12.00</span>
            <div class="card-chat-name">Selena Gomez</div>
          </div>
          <div class="card-chat-bottom">
            <div class="card-chat-text">
              <span>Lorem ipsum dolor sit amet consectetur adipisicing elit.</span>
            </div>
            <div>
              <span class="card-chat-count">2</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="card-chat-collection">
      <div class="card-chat-items">
        <div class="card-chat-image">
          <img src="../../assets/selena-gomez.jpg" alt="">
        </div>
        <div class="card-chat-wrapper">
          <div class="card-chat-top">
            <span class="card-chat-time">12.00</span>
            <div class="card-chat-name">Selena Gomez</div>
          </div>
          <div class="card-chat-bottom">
            <div class="card-chat-text">
              <span>Lorem ipsum dolor sit amet consectetur adipisicing elit.</span>
            </div>
            <div>
              <span class="card-chat-count">2</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="card-chat-collection">
      <div class="card-chat-items">
        <div class="card-chat-image">
          <img src="../../assets/selena-gomez.jpg" alt="">
        </div>
        <div class="card-chat-wrapper">
          <div class="card-chat-top">
            <span class="card-chat-time">12.00</span>
            <div class="card-chat-name">Selena Gomez</div>
          </div>
          <div class="card-chat-bottom">
            <div class="card-chat-text">
              <span>Lorem ipsum dolor sit amet consectetur adipisicing elit.</span>
            </div>
            <div>
              <span class="card-chat-count">2</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
