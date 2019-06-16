// 节点类
function LinkList() {
    var Node = function (data) {
        this.data = data
        this.next = null
    }
    var length = 0
    var head = null
    var tail = null

    // 在尾部添加一个节点
    this.append = function (data) {
        // 创建新节点
        var new_node = new Node(data)
        if (head === null) {
            head = new_node
            tail = new_node
        } else {
            tail.next = new_node
            tail = new_node
        }
        length += 1
        return true
    }

    this.print = function () {
        var curr_node = head
        while (curr_node) {
            console.log(curr_node.data)
            curr_node = curr_node.next  // 关键
        }
    }

    this.insert = function (index, data) {
        if (index < 0 || index > length) {
            return false
        } else if (index = length) {
            return this.append(data)
        } else {
            var new_node = new Node(data)
            // new_node 变成新的头节点
            if (index === 0) {
                new_node.next = head
                head = new_node
            } else {
                var insert_index = 1
                var curr_node = head // curr_node 是插入位置的前一个节点
                while (insert_index < index) {
                    insert_index += 1
                    curr_node = curr_node.next
                }
                // index = 1 curr_node 指向head， 第一个节点

                // 循环结束, 找到插入位置的下一个节点
                var next_node = curr_node.next // next_node 是第二个节点
                // 第一个节点指向新节点 当前节点连结插入来的新节点
                curr_node.next = new_node
                // 新节点指向第二个节点， 新节点连接原来拆开的下一个节点
                new_node.next = next_node
            }
            length += 1
            return true
        }
    }

    this.remove = function (index) {
        if (index < 0 || index >= length) {
            return null
        } else {
            var del_node = null
            if (index === 0) {
                del_node = head
                head = head.next
            } else {

                var del_index = 0
                var pre_node = null // 被删除节点的前一个节点
                var curr_node = head // curr_node 就是要删除的节点
                while(del_index < index) {
                    del_index += 1
                    pre_node = curr_node
                    curr_node = curr_node.next
                }
                del_node = curr_node
                pre_node.next = curr_node.next // 被删除节点的前一个节点的next 修改为被删除节点的next，把删除节点的前后节点连接起来
                // 如果被删除的节点是尾节点
                if (curr_node.next = null)  {
                    tail = pre_node
                }
            }
            length -= 1
            del_node.next = null // 被删除节点的next指针清空， 清内存
        } 
    }


}
var link = new LinkList()
link.append(2)
link.append(4)
link.append(8)
link.print()

// link.insert(0, 3)
link.remove(1)
link.print()


