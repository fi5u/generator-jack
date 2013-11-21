<?php
class _s_latest_cats_widget extends WP_Widget {

    function __construct() {
        parent::__construct(
            // Base ID of your widget
            '_s_latest_cats_widget',

            // Widget name will appear in UI
            __('Latest from Category', '_s'),

            // Widget description
            array( 'description' => __( 'Show intro text for the latest posts from a category', '_s' ), )
        );
    }

    // FRONT END
    public function widget( $args, $instance ) {
        $title = apply_filters( 'widget_title', $instance['title'] );
        $category = $instance['category'];
        $quantity = $instance['quantity'];
        // before and after widget arguments are defined by themes
        echo $args['before_widget'];
        if ( ! empty( $title ) )
            echo $args['before_title'] . $title . $args['after_title'];

        if ( ! empty( $category ) ) {
            $args = array(
                'cat' => $category,
                'posts_per_page' => $quantity
            );
            $cats_query = new WP_Query($args);
            while ($cats_query->have_posts()) : $cats_query->the_post();
                the_title('<a href="'. get_permalink() .'"><h4>', '</h4></a>');
                the_excerpt();
            endwhile;
        }
        echo $args['after_widget'];
    }

    // BACK END
    public function form( $instance ) { ?>

        <?php
        if ( isset( $instance[ 'title' ] ) ) {
            $title = $instance[ 'title' ];
        } else {
            $title = __( 'New title', '_s' );
        }
        ?>

        <p>
            <label for="<?php echo $this->get_field_id( 'title' ); ?>"><?php _e( 'Title:' ); ?></label>
            <input id="<?php echo $this->get_field_id( 'title' ); ?>" name="<?php echo $this->get_field_name( 'title' ); ?>" type="text" value="<?php echo esc_attr( $title ); ?>" />
        </p>

        <p>
        <select name="<?php echo $this->get_field_name( 'category' ); ?>" id="<?php echo $this->get_field_id( 'category' ); ?>">
            <option value=""><?php echo esc_attr(__('Select category')); ?></option>
            <?php
            $args = array('orderby'=>'count', 'order'=>'desc');
            $categories = get_categories($args);

            foreach ($categories as $category) {
                if ( isset($instance['category']) && $instance['category'] === $category->cat_ID ) {
                    $selected = "selected";
                } else {
                    $selected = "";
                }
                $option = '<option value="'.$category->cat_ID.'" '. $selected .'>';
                $option .= $category->cat_name;
                $option .= ' ('.$category->category_count.')';
                $option .= '</option>';
                echo $option;
            }
            ?>
        </select>
        </p>

        <?php
        if ( isset( $instance[ 'quantity' ] ) ) {
            $quantity = $instance[ 'quantity' ];
        } else {
            $quantity = __( '3', '_s' );
        }
        ?>

        <p>
            <label for="<?php echo $this->get_field_id( 'quantity' ); ?>"><?php _e( 'Number of posts:' ); ?></label>
            <input id="<?php echo $this->get_field_id( 'quantity' ); ?>" name="<?php echo $this->get_field_name( 'quantity' ); ?>" type="number" value="<?php echo esc_attr( $quantity ); ?>" />
        </p>

        <?php
    }

    // Updating widget replacing old instances with new
    public function update( $new_instance, $old_instance ) {
        $instance = array();
        $instance['title'] = ( ! empty( $new_instance['title'] ) ) ? strip_tags( $new_instance['title'] ) : '';
        $instance['category'] = ( ! empty( $new_instance['category'] ) ) ? strip_tags( $new_instance['category'] ) : '';
        $instance['quantity'] = ( ! empty( $new_instance['quantity'] ) ) ? strip_tags( $new_instance['quantity'] ) : '';
        return $instance;
    }
}